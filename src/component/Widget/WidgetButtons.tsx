import React from "react";
import { Button } from "react-bootstrap";
import useWidgetButton from "../../hook/Widget/useWidgetButton";

const WidgetButtons = ({ widgetId, chartType, apiKey }: any) => {
    const { onClickShowSetting, onClickEdit, onClickDelete } = useWidgetButton({
        widgetId,
        chartType,
        apiKey,
    });
    return (
        <>
            <Button
                onClick={onClickShowSetting}
                // disabled={callApiObject.status === "PAST"}
                size="sm"
            >
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
