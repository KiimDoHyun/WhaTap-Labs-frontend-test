import { useContext } from "react";
import { Button } from "react-bootstrap";
import { WidgetPropsSettingModalSetterContext } from "../../store/WidgetProvider";

const WidgetButtons = ({
    setTrueActiveWidgetModal,
    widgetId,
    chartType,
    apiKey,
}: any) => {
    const { setTrueActiveWidgetSettingModal, deleteWidgetProps } = useContext(
        WidgetPropsSettingModalSetterContext
    );

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
