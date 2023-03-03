import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { enqueueApi } from "..";
import api, { OPEN_API } from "../api";
import { DataType, OPEN_APIType } from "../types/api";
import { dateType, WidgetPropsType } from "../types/widget";
import BarChart from "./chart/BarChart";
import InformaticsChart from "./chart/InformaticsChart";
import LineChart from "./chart/LineChart";
import WidgetModal from "./Widget/WidgetModal";

export const DEFAULT_CALL_CYCLE = 5;

const OPEN_API_WITH_TYPE: OPEN_APIType = OPEN_API;

const chageDate = (dateInfo: dateType) => ({
    string: `${dateInfo.year}-${dateInfo.month}-${dateInfo.date}T${dateInfo.hour}:${dateInfo.min}:00`,
    date: new Date(
        `${dateInfo.year}-${dateInfo.month}-${dateInfo.date}T${dateInfo.hour}:${dateInfo.min}:00`
    ),
});

const Widget = ({
    chartType,
    apiKey,
    isCallRealTime,
    startDate,
    endDate,
    isActiveSelectRange,
    isSearchSpecificSection,
    setIsSearchSpecificSection,
    selectedRealTime,
}: WidgetPropsType) => {
    // api 호출 여부
    const [isCallApi, setIsCallApi] = useState(true);

    // api 를 마지막으로 호출한 시간
    const [lastCallTime, setLastCallTime] = useState(null);

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
                    ? OPEN_API_WITH_TYPE[""][item]
                    : OPEN_API_WITH_TYPE["json"][item],
        }))
    );

    const apiObj = (key: string) => {
        return {
            callApi: () => api.spot(key),
            success: (data: DataType) => {
                // console.log("startDate : ", chageDate(startDate));
                // console.log("endDate : ", chageDate(endDate));

                setDataSource((prev) =>
                    prev.map((item) => (item.key === key ? data : item))
                );
            },
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };

    const onClickShowSetting = () => {
        setIsShowSettingModal(true);
        // api 호출 정지/시작
        // api 호출 시점 변경
        // 호출 정지시 정시 시간을 알아야 한다.
    };

    // 호출할 api 등록
    const interval = useRef(null);
    const intervalCallback = useRef(() => {});

    // start / end ( temp )
    const [s, ss] = useState(null);
    const [e, se] = useState(null);
    const [dif, setDif] = useState(0); // 구간 차이 (초단위)

    const callApiFunction = useCallback(() => {
        const { type, keys } = apiKey;
        return () =>
            keys.forEach((apiItem) => {
                enqueueApi(apiObj(apiItem));
            });
    }, [apiKey]);
    //         keys.forEach((apiItem) => {
    //             enqueueApi(apiObj(apiItem));
    //         });
    // 실시간 조회 시작 / 일시 정지: 특정 구간 선택 활성화에 따라 결정
    useEffect(() => {
        const { type, keys } = apiKey;
        if (isActiveSelectRange) {
            clearInterval(interval.current);
        } else {
            clearInterval(interval.current);
            intervalCallback.current = () => {
                const start = Date.now() - 1000 * 60 * selectedRealTime;
                const end = Date.now();

                // Line 차트의 경우 이 시간을 전달해야 한다.
                ss(new Date(start));
                se(new Date(end));
                setDif((end - start) / 1000);

                keys.forEach((apiItem) => {
                    enqueueApi(apiObj(apiItem));
                });

                setLastCallTime(new Date(Date.now()));
            };

            intervalCallback.current();
            interval.current = setInterval(
                intervalCallback.current,
                callCycleRef.current * 1000
            );

            // + 마지막 호출 시간 지정?
        }
    }, [isActiveSelectRange, selectedRealTime, apiKey]);

    // 특정 구간 조회 (1 회)
    useEffect(() => {
        const { type, keys } = apiKey;
        if (isSearchSpecificSection) {
            // Line 차트의 경우 이 시간을 전달해야 한다.
            ss(chageDate(startDate).date);
            se(chageDate(endDate).date);
            setDif(
                (Date.parse(chageDate(endDate).string) -
                    Date.parse(chageDate(startDate).string)) /
                    1000
            );

            keys.forEach((apiItem) => {
                enqueueApi(apiObj(apiItem));
            });

            setIsSearchSpecificSection(false);
        }
    }, [isSearchSpecificSection, apiKey]);

    // 호출 주기 변경
    const onClickApplyCallCycle = (inputValue: number) => {
        if (window.confirm("호출 주기를 변경하시겠습니까?")) {
            callCycleRef.current = inputValue;

            setCallCycle(inputValue);

            // 기존 호출 interval 제거
            clearInterval(interval.current);

            // 주기 변경후 재 등록
            interval.current = setInterval(
                intervalCallback.current,
                inputValue * 1000
            );
        }
    };

    return (
        <WidgetBlock>
            <button onClick={onClickShowSetting} disabled={isActiveSelectRange}>
                showSetting
            </button>

            {/* 차트 */}
            {chartType === "BAR" && <BarChart dataSource={dataSource} />}
            {chartType === "LINE" && (
                <LineChart
                    dataSource={dataSource}
                    startDate={s}
                    endDate={e}
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
                isCallApi={isCallApi}
                setIsCallApi={setIsCallApi}
                onClickApplyCallCycle={onClickApplyCallCycle}
            />
            {/* 상태: 실시간 호출중, 특정 구간 호출중, 호출 정지 */}
            {/* <div>api 호출 상태: {isCallApi ? "호출 중" : "호출 정지"}</div> */}
        </WidgetBlock>
    );
};

const WidgetBlock = styled.div``;

export default Widget;
