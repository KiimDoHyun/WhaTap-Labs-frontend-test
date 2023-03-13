import { useContext } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { WidgetPropsSettingModalSetterContext } from "../../store/WidgetPropsSettingModalProvider";
import { WidgetSetterContext } from "../../store/WidgetProvider";

interface PropsType {
    setTrueActiveWidgetModal: () => void;
    chartType: string;
    apiKey: { type: string; keys: string[] };
    widgetId: number;
}

const WidgetButtons = ({
    setTrueActiveWidgetModal,
    widgetId,
    chartType,
    apiKey,
}: PropsType) => {
    const { setTrueActiveWidgetSettingModal } = useContext(
        WidgetPropsSettingModalSetterContext
    );
    const { deleteWidgetProps } = useContext(WidgetSetterContext);

    // 호출 주기 조정 모달
    const onClickShowSetting = () => {
        setTrueActiveWidgetModal();
    };

    const onClickEdit = () => {
        setTrueActiveWidgetSettingModal("MODI", widgetId, chartType, apiKey);
    };

    const onClickDelete = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            deleteWidgetProps(widgetId);
        }
    };

    return (
        <WidgetButtonsBox>
            <Button size="sm" onClick={onClickShowSetting}>
                호출 주기 변경
            </Button>
            <Button size="sm" onClick={onClickEdit}>
                위젯 설정 변경
            </Button>
            <Button size="sm" onClick={onClickDelete}>
                위젯 제거
            </Button>
        </WidgetButtonsBox>
    );
};

const WidgetButtonsBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px;
    box-sizing: border-box;
`;

export default WidgetButtons;
