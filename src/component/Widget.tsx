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

    const [lastCallTime, setLastCallTime] = useState(null);

    const apiObj = (type: string) => {
        return {
            callApi: () => api.spot(type),
            success: () => {},
            // success: () => console.log("api 호출에 성공했습니다.", type),
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };

    const onClickShowSetting = () => {
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
    기존 interval을 중지하고
    새로운 시간이 할당된 interval을 다시 시작시킨다.
    */

    /*
    어떤 차트를 사용할지
    조회할 api
    조회할 구간
    조회 정지. 시작

    위젯은 데이터 조회관련을 담당한다.

    차트 컴포넌트에 차트를 그리는데 필요한 데이터를 전달한다.
    */

    /*
    조회 시점 조절
    */
    return (
        <WidgetBlock>
            <button onClick={onClickShowSetting}>showSetting</button>

            {/* 차트 */}

            {/* 모달 */}
            {/* <WidgetModal /> */}
            <ModalBlock>
                <button onClick={() => setIsCallApi(true)}>
                    api를 호출한다.
                </button>
                <button onClick={() => setIsCallApi(false)}>
                    api를 호출안한다.
                </button>
                <div>
                    마지막호출 시점:{" "}
                    {lastCallTime
                        ? lastCallTime.toLocaleString()
                        : "호출 정보 없음"}
                </div>
                <div>호출 주기: {callCycle}초</div>
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
