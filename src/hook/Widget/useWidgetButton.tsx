import React, { useCallback, useContext } from "react";
import {
    WidgetPropsSettingModalSetterContext,
    WidgetSettingModalSetterContext,
} from "../../store/WidgetProvider";

const useWidgetButton = ({ widgetId, chartType, apiKey }: any) => {
    const { setTrueActiveWidgetSettingModal, deleteWidgetProps } = useContext(
        WidgetPropsSettingModalSetterContext
    );

    const { setTrueActiveWidgetModal } = useContext(
        WidgetSettingModalSetterContext
    );

    const onClickShowSetting = useCallback(() => {
        setTrueActiveWidgetModal();
    }, []);

    const onClickEdit = useCallback(() => {
        setTrueActiveWidgetSettingModal("MODI", widgetId, chartType, apiKey);
    }, [widgetId, chartType, apiKey]);

    const onClickDelete = useCallback(() => {
        if (window.confirm("삭제하시겠습니까?")) {
            deleteWidgetProps(widgetId);
        }
    }, [widgetId]);

    return { onClickShowSetting, onClickEdit, onClickDelete };
};

export default useWidgetButton;
