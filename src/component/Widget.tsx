import { useEffect, useRef, useState } from "react";
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

const chageDate = (dateInfo: dateType) =>
    new Date(
        `${dateInfo.year}-${dateInfo.month}-${dateInfo.date}T${dateInfo.hour}:${dateInfo.min}:00`
    );

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
    // useEffect(() => {
    //     console.log("startDate :", startDate);
    // }, [startDate]);

    // useEffect(() => {
    //     console.log("endDate :", endDate);
    // }, [endDate]);
    // api 호출 여부
    const [isCallApi, setIsCallApi] = useState(true);

    // api 를 마지막으로 호출한 시간
    const [lastCallTime, setLastCallTime] = useState(null);

    const [isShowSettingModal, setIsShowSettingModal] = useState(false);

    // 호출 주기
    const callCycleRef = useRef(DEFAULT_CALL_CYCLE);

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

    // 실시간 조회 시작 / 일시 정지: 특정 구간 선택 활성화에 따라 결정
    useEffect(() => {
        if (isActiveSelectRange) {
            clearInterval(interval.current);
            console.log("실시간 조회를 비활성화 합니다.");
        } else {
            clearInterval(interval.current);
            interval.current = setInterval(() => {
                console.log("호출 구간: ", selectedRealTime);
            }, callCycleRef.current * 1000);
            console.log(
                "실시간 조회를 활성화 합니다. 호출주기: ",
                callCycleRef.current
            );
            console.log("호출 구간: ", selectedRealTime);
        }
    }, [isActiveSelectRange, selectedRealTime]);

    // 특정 구간 조회 (1 회)
    useEffect(() => {
        if (isSearchSpecificSection) {
            console.log("특정 구간을 조회합니다.");
            console.log(
                "구간: " +
                    "\n" +
                    chageDate(startDate) +
                    "\n" +
                    chageDate(endDate)
            );
            setIsSearchSpecificSection(false);
        }
    }, [isSearchSpecificSection]);

    // useEffect(() => {
    //     const { type, keys } = apiKey;

    //     // type 이 spot / series 일 수 있음[]

    //     /*
    //     series 도 spot 데이터로 조회함.

    //     1. Dashboard 에서 설정한 전체 조회 범위를 series 에 설정한다.
    //     2. 조회한 spot 데이터와 조회한 시간을 저장한다.

    //     spot 형 데이터 조회는?

    //     실시간이 아니라면 해당 구간의 데이터만 보여준다.

    //     실시간이 아니라면 해당 구간의 데이터만 조회한다.
    //     실시간이라면 매번 갱신한다.

    //     */
    //     if (keys.length < 1) return;

    //     intervalCallback.current = () => {
    //         setLastCallTime(new Date(Date.now()));
    //         keys.forEach((apiItem) => {
    //             enqueueApi(apiObj(apiItem));
    //         });
    //     };

    //     if (isCallRealTime) {
    //         if (isCallApi) {
    //             // 실시간 조회 인 경우 setInterval
    //             // 특정 구간 조회인 경우 callback 실행
    //             interval.current = setInterval(
    //                 intervalCallback.current,
    //                 callCycleRef.current * 1000
    //             );
    //         } else {
    //             clearInterval(interval.current);
    //         }
    //     } else {
    //         intervalCallback.current();
    //     }
    // }, [apiKey, isCallApi, isCallRealTime]);

    // 호출 주기 변경
    const onClickApplyCallCycle = (inputValue: number) => {
        if (window.confirm("호출 주기를 변경하시겠습니까?")) {
            callCycleRef.current = inputValue;

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
                    startDate={chageDate(startDate)}
                    endDate={chageDate(endDate)}
                    selectedRealTime={selectedRealTime} // 실시간 조회 범위 구간 (분단위)
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
            <div>api 호출 상태: {isCallApi ? "호출 중" : "호출 정지"}</div>
        </WidgetBlock>
    );
};

const WidgetBlock = styled.div``;

export default Widget;
