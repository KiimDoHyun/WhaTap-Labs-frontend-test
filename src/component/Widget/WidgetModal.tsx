import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { DEFAULT_CALL_CYCLE } from "../../common/widget";
import { WidgetModalPropsType } from "../../types/widget";

const WidgetModal = ({
    show,
    setShow,
    lastCallTime,
    onClickApplyCallCycle,
}: WidgetModalPropsType) => {
    // 호출 주기 입력값
    const [callCycleValue, setCallCycleValue] = useState(DEFAULT_CALL_CYCLE);

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <div>
                <label>호출 주기 (초)</label>
                <input
                    value={callCycleValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCallCycleValue(Number(e.target.value));
                    }}
                />
                <button onClick={() => onClickApplyCallCycle(callCycleValue)}>
                    적용하기
                </button>
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
