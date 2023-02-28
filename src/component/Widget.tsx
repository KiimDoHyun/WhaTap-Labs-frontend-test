import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { enqueueApi } from "..";
import api from "../api";
import { WidgetPropsType } from "../types/widget";
import WidgetModal from "./Widget/WidgetModal";

const Widget = ({ chartType, apiKey }: WidgetPropsType) => {
    // console.log("apiKey: ", apiKey);
    // console.log("chartType: ", chartType);

    // api 호출 여부
    const [isCallApi, setIsCallApi] = useState(true);

    // 호출 리스트
    const [apiList, setApiList] = useState<string[]>([]);

    // 호출 주기
    const [callCycle, setCAllCycle] = useState<number>(5);

    // 마지막 호출 시간
    const [lastCallTime, setLastCallTime] = useState(null);

    const [isShowSettingModal, setIsShowSettingModal] = useState(false);
    const apiObj = (type: string) => {
        return {
            callApi: () => api.spot(type),
            success: () => {},
            // success: () => console.log("api 호출에 성공했습니다.", type),
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };

    const onClickShowSetting = () => {
        setIsShowSettingModal(true);
        // api 호출 정지/시작
        // api 호출 시점 변경
        // 호출 정지시 정시 시간을 알아야 한다.
    };

    // 호출할 key 설정
    useEffect(() => {
        for (const key in apiKey) {
            if (key === "spot") {
                /*
                    모달을 띄워서 현재 호출되는 리스트를 본다.
                    매번 현재 데이터를 호출한다. (default)
                    조회 시점을 선택할 수 있다.
                    조회 시점을 변경하면 해당 시점부터 5초 간격으로 호출한다.
                    호출을 정지할 수 있다.
                */

                setApiList(apiKey[key]);
                console.log("spot 형");
            } else if (key === "series") {
                console.log("series 형");
                // 조회 범위 설정 가능
            } else {
                console.log("정의되지 않은 api 타입");
            }
        }
    }, [apiKey]);

    const callCycleRef = useRef(5);

    // 호출할 api 등록
    const interval = useRef(null);
    const intervalCallback = useRef(() => {});
    useEffect(() => {
        if (apiList.length < 1) return;

        if (isCallApi) {
            intervalCallback.current = () => {
                setLastCallTime(new Date(Date.now()));
                apiList.forEach((apiItem) => {
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
    }, [apiList, isCallApi]);

    // 호출 주기 조정
    const [callCycleInput, setCallCycleInput] = useState(5);
    const onClickApplyCallCycle = () => {
        console.log("적용할 시간", callCycleInput);

        if (window.confirm("호출 주기를 변경하시겠습니까?")) {
            setCAllCycle(callCycleInput);
            callCycleRef.current = callCycleInput;

            // 기존 호출 interval 제거
            clearInterval(interval.current);

            // 주기 변경후 재 등록
            interval.current = setInterval(
                intervalCallback.current,
                callCycleInput * 1000
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

            {/* 모달 */}
            <WidgetModal
                show={isShowSettingModal}
                setShow={setIsShowSettingModal}
                lastCallTime={lastCallTime}
                callCycle={callCycle}
                isCallApi={isCallApi}
                setIsCallApi={setIsCallApi}
            />
            <ModalBlock>
                <input
                    value={callCycleInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCallCycleInput(Number(e.target.value));
                    }}
                />
                <button onClick={onClickApplyCallCycle}>적용하기</button>
                <div>api 호출 상태: {isCallApi ? "호출 중" : "호출 정지"}</div>
            </ModalBlock>
        </WidgetBlock>
    );
};

const WidgetBlock = styled.div``;
const ModalBlock = styled.div`
    width: 300px;
    height: 300px;
    border: 1px solid;
    background: white;
`;
export default Widget;
