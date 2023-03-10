import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { enqueueApi } from "..";
import { getApiName } from "../api";
import { getDateRange, parseDate } from "../common/date";
import { DEFAULT_CALL_CYCLE } from "../common/widget";
import useBoolean from "../hook/useBoolean";
import { DashboardContext } from "../store/DashboardProvider";
import { DataType } from "../types/api";
import { WidgetPropsType } from "../types/widget";
import WidgetButtons from "./Widget/WidgetButtons";
import WidgetChart from "./Widget/WidgetChart";
import WidgetCallCycleSettingModal from "./Widget/WidgetCallCycleSettingModal";
import { createApiObj } from "../common/api";

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
    const [dataSource, setDataSource] = useState<
        {
            key: string;
            data: any;
            name: string;
        }[]
    >([]);

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
                    fail: () => console.warn("api 호출에 실패했습니다."),
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
