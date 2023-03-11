import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { enqueueApi } from "..";
import { getDateRange, parseDate } from "../common/date";
import { DEFAULT_CALL_CYCLE } from "../common/widget";
import useBoolean from "../hook/useBoolean";
import { DashboardContext } from "../store/DashboardProvider";
import { WidgetPropsType, DataType } from "../types/widget";
import WidgetButtons from "./Widget/WidgetButtons";
import WidgetChart from "./Widget/WidgetChart";
import WidgetCallCycleSettingModal from "./Widget/WidgetCallCycleSettingModal";
import { createApiObj, getApiName } from "../common/api";
import { dataSourceType } from "../types/chart";

/*

위젯의 역할
? 1. api 호출
? 2. 호출 주기 변경
? 3. 차트 출력

===
? 1. api 호출 관련 로직만 남긴다.
? 2. 호출 주기 변경 로직은 모달에서 처리한다.
    ? - 주기 변경함수를 전달한다 : 기능의 분리가 이루어 지지 않은듯 하다.
    ? - 주기 변경함수를 모달에서 구현한다. : 기능구현을 위해 너무 많은 props 전달이 발생한다.
? 3. 차트 출력은 WidgetChart 에서 분기해서 처리하도록 한다.

props 전달을 줄이기 위해서 각 위젯의 내부에서만 사용할 데이터를 Context로 관리 해야하는가?
각 위젯 내부에서만 사용할 지역 변수인데?
대신 customHook으로 공통화 한다면?

=================

위젯의 api 호출 관련 로직을 추상화 한다 -> customHook 으로?
(위젯에서만 사용할 로직들을 customHook으로?)

vs

차트생성 관련 로직은 모두 추상화 했다. 
왜?
d3.js 로 생성되는 차트에만 사용되는 로직들이지만 컴포넌트에서 '어떻게'가 아닌 '무엇을' 하는지 보여주기 위해

따라서 각 차트 컴포넌트는 무엇을 하는지만 관심이 있다.
ex) createLineXScale 로 라인차트의 xScale을 생성한다. 어떻게 생성하는지는 관심 X

-> 그렇다면
실제 로직을 컴포넌트에서 어떻게 구현되는지 보여주는 대신 모두 customHook으로 대체한다.
각 컴포넌트는 무엇을 하는지에 대해서만 관심을 가진다.
"어떻게는" 각 customHook에 구현되어있다.

Presentational container 와 비교
로직의 구현 / 출력이 구분되는 점은 동일하다.
로직을 다른 컴포넌트도 사용할 수 있는점이 다르다.

위젯에서만 사용될 로직도 customHook 으로 만들어야 하는가?



*/

const Widget = ({ chartType, apiKey, widgetId }: WidgetPropsType) => {
    // api 호출 범위/구간/상태
    const [callApiObject] = useContext(DashboardContext);

    // api 를 마지막으로 호출한 시간
    const [lastCallTime, setLastCallTime] = useState(null);

    // 호출 주기 조정 모달
    const {
        state: activeWidgetModal,
        setTrue: setTrueActiveWidgetModal,
        setFalse: setFalseActiveWidgetModal,
    } = useBoolean(false);

    // 호출 주기
    const callCycleRef = useRef(DEFAULT_CALL_CYCLE);

    // 차트에 사용할 데이터
    const [dataSource, setDataSource] = useState<dataSourceType[]>([]);

    // api 호출 관련 정보
    const [apiInfo, setApiInfo] = useState({
        startDate: null,
        endDate: null,
        dif: 0,
        callCycle: DEFAULT_CALL_CYCLE,
    });

    // interval
    const interval = useRef(null);

    // interval 에서 수행할 callback
    const intervalCallback = useCallback(
        (startDate: number, endDate: number) => {
            const { keys } = apiKey;

            // api 호출 관련 정보
            setApiInfo((prevApiInfo: any) => ({
                ...prevApiInfo,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                dif: (endDate - startDate) / 1000,
            }));

            // 호출  api 등록
            keys.forEach((apiItem) => {
                const body = {
                    key: apiItem,
                    success: (data: DataType) => {
                        setDataSource((prev) =>
                            prev.map((item) =>
                                item.key === apiItem ? data : item
                            )
                        );
                    },
                    fail: () => console.warn("api호출에 실패했습니다."),
                };
                enqueueApi(createApiObj(body));
            });

            // 마지막 조회 시간 설정 (api를 호출했던 실제 시간)
            setLastCallTime(new Date(Date.now()));
        },
        [apiKey]
    );

    useEffect(() => {
        setDataSource(
            apiKey.keys.map((item: string) => ({
                key: item,
                data: null,
                name: getApiName({ type: apiKey.type, key: item }),
            }))
        );
    }, [apiKey]);

    // api 호출 로직
    useEffect(() => {
        const { status, pastBody, nowBody } = callApiObject;

        switch (status) {
            case "NOW":
                clearInterval(interval.current);
                // 조회 시작, 종료 시간 설정
                const { startDate, endDate } = getDateRange(nowBody.range);

                intervalCallback(startDate, endDate);

                interval.current = setInterval(() => {
                    const { startDate, endDate } = getDateRange(nowBody.range);

                    intervalCallback(startDate, endDate);
                }, callCycleRef.current * 1000);
                break;
            case "PAST":
                if (Object.keys(pastBody).length < 1) break;

                intervalCallback(
                    parseDate(pastBody.startDate),
                    parseDate(pastBody.endDate)
                );

                break;
            case "STOP":
                clearInterval(interval.current);
                break;

            default:
                break;
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [callApiObject, intervalCallback]);

    return (
        <WidgetBlock>
            <WidgetButtons
                setTrueActiveWidgetModal={setTrueActiveWidgetModal}
                widgetId={widgetId}
                chartType={chartType}
                apiKey={apiKey}
            />

            {/* 차트 */}
            <WidgetChart
                chartType={chartType}
                dataSource={dataSource}
                apiInfo={apiInfo}
            />

            {/* 모달 */}
            <WidgetCallCycleSettingModal
                show={activeWidgetModal}
                onHide={setFalseActiveWidgetModal}
                lastCallTime={lastCallTime}
                callCycleRef={callCycleRef}
                interval={interval}
                intervalCallback={intervalCallback}
                range={callApiObject.nowBody.range}
                status={callApiObject.status}
                setApiInfo={setApiInfo}
            />
        </WidgetBlock>
    );
};

const WidgetBlock = styled.div`
    width: 100%;
    height: 100%;
`;

export default Widget;
