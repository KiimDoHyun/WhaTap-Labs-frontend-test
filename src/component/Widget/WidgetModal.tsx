import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListPicker from "../../common/DatePicker/ListPicker";
import { DEFAULT_CALL_CYCLE } from "../Widget";

const WidgetModal = ({
    show,
    setShow,
    lastCallTime,
    isCallApi,
    setIsCallApi,
    onClickApplyCallCycle,
}: any) => {
    // 호출 여부 스위치
    const [switchValue, setSwitchValue] = useState(isCallApi);

    // 호출 주기 입력값
    const [callCycleValue, setCallCycleValue] = useState(DEFAULT_CALL_CYCLE);

    const onChangeSwich = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { checked },
        } = e;
        setSwitchValue(checked);
        setIsCallApi(checked);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Form>
                <Form.Check.Label>데이터 호출 활성화 여부</Form.Check.Label>
                <Form.Check
                    checked={switchValue}
                    onChange={onChangeSwich}
                    type="switch"
                    id="custom-switch"
                    label={switchValue ? "활성화" : "비활성화"}
                />
            </Form>
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
