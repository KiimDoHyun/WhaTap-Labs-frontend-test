import { useContext } from "react";
import { Button } from "react-bootstrap";
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
        <>
            <Button onClick={onClickShowSetting} size="sm">
                showSetting
            </Button>
            <Button size="sm" onClick={onClickEdit}>
                EDIT
            </Button>
            <Button size="sm" onClick={onClickDelete}>
                DELETE
            </Button>
        </>
    );
};

export default WidgetButtons;
