import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { getDateRange } from "../../common/date";
import { DEFAULT_CALL_CYCLE } from "../../common/widget";
import CycleInput from "./WidgetCallCycleSettingModal/CycleInput";
import LastCallTimeBox from "./WidgetCallCycleSettingModal/LastCallTimeBox";

const WidgetCallCycleSettingModal = ({
    show,
    onHide,
    lastCallTime,
    callCycleRef,
    interval,
    intervalCallback,
    range,
    status,
    setApiInfo,
}: any) => {
    // 호출 주기 입력값
    const [callCycleValue, setCallCycleValue] = useState(DEFAULT_CALL_CYCLE);

    // 호출 주기 변경
    const onClickApplyCallCycle = () => {
        if (window.confirm("호출 주기를 변경하시겠습니까?")) {
            // 호출 주기 변경
            callCycleRef.current = callCycleValue;

            setApiInfo((prevApiInfo: any) => ({
                ...prevApiInfo,
                callCycle: callCycleValue,
            }));

            if (status === "NOW") {
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

            onHide();
        }
    };

    // 입력값 onChange 이벤트
    const onChangeCallCycleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCallCycleValue(Number(e.target.value));
    };

    return (
        <Modal show={show} onHide={onHide}>
            <CycleInput
                value={callCycleValue}
                onChange={onChangeCallCycleInput}
            />
            <ApplyButtonBox>
                <Button onClick={onClickApplyCallCycle}>적용하기</Button>
            </ApplyButtonBox>
            <LastCallTimeBox lastCallTime={lastCallTime} />
            <BottomButtonBox>
                <Button onClick={onHide}>닫기</Button>
            </BottomButtonBox>
        </Modal>
    );
};

const ApplyButtonBox = styled.div``;

const BottomButtonBox = styled.div``;

export default WidgetCallCycleSettingModal;
