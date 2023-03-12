import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { DEFAULT_CALL_CYCLE } from "../../common/widget";
import useInput from "../../hook/useInput";
import CycleInput from "./WidgetCallCycleSettingModal/CycleInput";
import LastCallTimeBox from "./WidgetCallCycleSettingModal/LastCallTimeBox";

interface PropsType {
    show: boolean;
    onHide: () => void;
    lastCallTime: Date;
    onClickApplyCallCycle: (inputValue: number) => void;
}

const WidgetCallCycleSettingModal = ({
    show,
    onHide,
    lastCallTime,
    onClickApplyCallCycle,
}: PropsType) => {
    // 호출 주기 입력값
    const { input: callCycleValue, onChange } = useInput(DEFAULT_CALL_CYCLE);

    // 호출 주기 변경
    const onClickApply = () => {
        onClickApplyCallCycle(callCycleValue);
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide}>
            <CycleInput value={callCycleValue} onChange={onChange} />
            <ApplyButtonBox>
                <Button onClick={onClickApply}>적용하기</Button>
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
