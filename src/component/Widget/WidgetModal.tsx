import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { getDateRange } from "../../common/date";
import { DEFAULT_CALL_CYCLE } from "../../common/widget";
import {
    WidgetSettingModalSetterContext,
    WidgetSettingModalStateContext,
} from "../../store/WidgetProvider";
import { WidgetModalPropsType } from "../../types/widget";

const WidgetModal = ({
    lastCallTime,
    callCycleRef,
    setApiInfo,
    interval,
    intervalCallback,
    range,
}: any) => {
    // 호출 주기 입력값
    const [callCycleValue, setCallCycleValue] = useState(DEFAULT_CALL_CYCLE);

    const { setFalseActiveWidgetModal } = useContext(
        WidgetSettingModalSetterContext
    );

    const { activeWidgetModal } = useContext(WidgetSettingModalStateContext);

    // 호출 주기 변경
    const onClickApplyCallCycle = () => {
        if (window.confirm("호출 주기를 변경하시겠습니까?")) {
            // 호출 주기 변경
            callCycleRef.current = callCycleValue;

            setApiInfo((prevApiInfo: any) => ({
                ...prevApiInfo,
                callCycle: callCycleValue,
            }));

            // 기존 호출 interval 제거
            clearInterval(interval.current);

            // 호출이 활성화 되어있다면 재등록
            // 호출이 비활성화 되어있다면 호출 주기만 변경

            // 주기 변경후 재 등록 : status: NOW 인 경우
            interval.current = setInterval(() => {
                const { startDate, endDate } = getDateRange(range);

                intervalCallback(startDate, endDate);
            }, callCycleRef.current * 1000);
        }
    };
    return (
        <Modal show={activeWidgetModal} onHide={setFalseActiveWidgetModal}>
            <div>
                <label>호출 주기 (초)</label>
                <input
                    value={callCycleValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCallCycleValue(Number(e.target.value));
                    }}
                />
                <button onClick={onClickApplyCallCycle}>적용하기</button>
            </div>
            <div>
                마지막호출 시점:{" "}
                {lastCallTime
                    ? lastCallTime.toLocaleString()
                    : "호출 정보 없음"}
            </div>
            <div>
                <button>닫기</button>
            </div>
        </Modal>
    );
};

export default WidgetModal;
