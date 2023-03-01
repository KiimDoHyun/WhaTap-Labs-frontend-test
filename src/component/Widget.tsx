import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { enqueueApi } from "..";
import api, { OPEN_API } from "../api";
import { DataType, OPEN_APIType } from "../types/api";
import { WidgetPropsType } from "../types/widget";
import BarChart from "./BarChart";
import InformaticsChart from "./InformaticsChart";
import LineChart from "./LineChart";
import WidgetModal from "./Widget/WidgetModal";

export const DEFAULT_CALL_CYCLE = 5;

const OPEN_API_WITH_TYPE: OPEN_APIType = OPEN_API;

const Widget = ({ chartType, apiKey }: WidgetPropsType) => {
    // api 호출 여부
    const [isCallApi, setIsCallApi] = useState(true);

    // 마지막 호출 시간
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
    useEffect(() => {
        const { type, keys } = apiKey;

        // type 이 spot / series 일 수 있음
        if (keys.length < 1) return;

        if (isCallApi) {
            intervalCallback.current = () => {
                setLastCallTime(new Date(Date.now()));
                keys.forEach((apiItem) => {
                    enqueueApi(apiObj(apiItem));
                });
            };

            interval.current = setInterval(
                intervalCallback.current,
                callCycleRef.current * 1000
            );
        } else {
            clearInterval(interval.current);
        }
    }, [apiKey, isCallApi]);

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

    /*
    조회 시점을 조정한다

    대시보드의 전체 데이터 호출 시점을 조정?

    각 위젯의 데이터 갱신 주기 조정?
    */

    return (
        <WidgetBlock>
            <button onClick={onClickShowSetting}>showSetting</button>

            {/* 차트 */}
            {chartType === "BAR" && <BarChart dataSource={dataSource} />}
            {chartType === "LINE" && <LineChart />}
            {chartType === "INFO" && <InformaticsChart />}

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
