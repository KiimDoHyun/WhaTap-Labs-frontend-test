import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const WidgetModal = ({
    show,
    setShow,
    lastCallTime,
    callCycle,
    isCallApi,
    setIsCallApi,
}: any) => {
    // 호출 여부 스위치
    const [switchValue, setSwitchValue] = useState(isCallApi);

    // 호출 주기 입력값
    const [callCycleValue, setCallCycleValue] = useState(0);

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
                <Form.Label>호출 주기 설정</Form.Label>
                <Form.Control
                    value={callCycleValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCallCycleValue(Number(e.target.value))
                    }
                />
                <Form.Control type="time" />
            </Form>
            <div>
                {" "}
                마지막호출 시점:{" "}
                {lastCallTime
                    ? lastCallTime.toLocaleString()
                    : "호출 정보 없음"}
            </div>
            <div>호출 주기 {callCycle} 초</div>
        </Modal>
    );
};

export default WidgetModal;
