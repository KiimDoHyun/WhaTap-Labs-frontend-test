import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { enqueueApi } from "..";
import api, { OPEN_API } from "../api";
import { getDateRange, parseDate } from "../common/date";
import { DEFAULT_CALL_CYCLE } from "../common/widget";
import { DashboardContext } from "../store/DashboardProvider";
import { DataType } from "../types/api";
import { WidgetPropsType } from "../types/widget";
import BarChart from "./chart/BarChart";
import InformaticsChart from "./chart/InformaticsChart";
import LineChart from "./chart/LineChart";
import WidgetModal from "./Widget/WidgetModal";

/*
위젯의 역할

1. api 호출 주기 변경 (모달)
2. api 호출
    - callApiObject 에 따라 호출 로직이 다름

3. 모달 on/off
4. 차트 컴포넌트 호출


*/

const Widget = ({ chartType, apiKey }: WidgetPropsType) => {
    const [callApiObject] = useContext(DashboardContext);

    // api 를 마지막으로 호출한 시간
    /*
    set: Widget
    use: WidgetModal
    */
    const [lastCallTime, setLastCallTime] = useState(null);

    /*
    set: Widget
    use: WidgetModal
    */
    const [isShowSettingModal, setIsShowSettingModal] = useState(false);

    // 호출 주기
    const callCycleRef = useRef(DEFAULT_CALL_CYCLE);

    const [callCycle, setCallCycle] = useState(DEFAULT_CALL_CYCLE);

    // 데이터
    const [dataSource, setDataSource] = useState(
        apiKey.keys.map((item: string) => ({
            key: item,
            data: null,
            name:
                apiKey.type === "spot"
                    ? OPEN_API[""][item]
                    : OPEN_API["json"][item],
        }))
    );

    const apiObj = (key: string) => {
        return {
            callApi: () => api.spot(key),
            success: (data: DataType) => {
                setDataSource((prev) =>
                    prev.map((item) => (item.key === key ? data : item))
                );
            },
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };

    const onClickShowSetting = () => {
        setIsShowSettingModal(true);
    };

    // 라인차트 axis 생성용
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dif, setDif] = useState(600); // 구간 차이 (초단위)

    // 호출할 api 등록
    const interval = useRef(null);

    const intervalCallback = useCallback(
        (startDate: number, endDate: number) => {
            const { keys } = apiKey;

            // 조회 시작, 종료 시간 설정

            setStartDate(new Date(startDate));
            setEndDate(new Date(endDate));

            // 조회 간격 설정
            setDif((endDate - startDate) / 1000);

            // 호출  api 등록
            keys.forEach((apiItem) => {
                enqueueApi(apiObj(apiItem));
            });

            // 마지막 조회 시간 설정 (api를 호출했던 실제 시간)
            setLastCallTime(new Date(Date.now()));
        },
        [apiKey]
    );

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
    }, [callApiObject, intervalCallback]);

    // 호출 주기 변경
    const onClickApplyCallCycle = (inputValue: number) => {
        if (window.confirm("호출 주기를 변경하시겠습니까?")) {
            callCycleRef.current = inputValue;

            setCallCycle(inputValue);

            // 기존 호출 interval 제거
            clearInterval(interval.current);

            // 주기 변경후 재 등록
            interval.current = setInterval(() => {
                const { startDate, endDate } = getDateRange(
                    callApiObject.nowBody.range
                );

                intervalCallback(startDate, endDate);
            }, callCycleRef.current * 1000);
        }
    };

    return (
        <WidgetBlock>
            <Button
                onClick={onClickShowSetting}
                disabled={callApiObject.status === "PAST"}
                className="button"
                size="sm"
            >
                showSetting
            </Button>

            {/* 차트 */}
            {chartType === "BAR" && <BarChart dataSource={dataSource} />}
            {chartType === "LINE" && (
                <LineChart
                    dataSource={dataSource}
                    startDate={startDate}
                    endDate={endDate}
                    dif={dif}
                    callCycle={callCycle}
                />
            )}
            {chartType === "INFO" && (
                <InformaticsChart dataSource={dataSource} />
            )}

            {/* 모달 */}
            <WidgetModal
                show={isShowSettingModal}
                setShow={setIsShowSettingModal}
                lastCallTime={lastCallTime}
                onClickApplyCallCycle={onClickApplyCallCycle}
            />
        </WidgetBlock>
    );
};

const WidgetBlock = styled.div`
    width: 100%;
    height: 100%;

    // .button {
    //     height: 30px;
    // }
`;

export default Widget;
