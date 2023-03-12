import { useContext } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { WidgetSetterContext } from "../../../store/WidgetProvider";

interface TypesProp {
    selectedChartType: string[];
    selectedApiKeys: string[];
    type: string;
    widgetId: number;
    setFalse: () => void;
}

const WidgetPropsButtons = ({
    selectedChartType,
    selectedApiKeys,
    type,
    widgetId,
    setFalse,
}: TypesProp) => {
    const { setWidgetProps } = useContext(WidgetSetterContext);

    const onClickConfirm = () => {
        if (selectedChartType.length === 0) {
            alert("차트 타입을 선택해주세요");
            return;
        }

        if (selectedApiKeys.length === 0) {
            alert("사용할 데이터를 선택해주세요");
            return;
        }

        switch (type) {
            case "ADD":
                if (window.confirm("추가하시겠습니까?")) {
                    setWidgetProps((widgetProps: any) => [
                        ...widgetProps,
                        {
                            widgetId: Math.random(),
                            chartType: selectedChartType[0],
                            apiKey: {
                                type: "spot",
                                keys: selectedApiKeys,
                            },
                        },
                    ]);
                    setFalse();
                }
                break;
            case "MODI":
                if (window.confirm("수정하시겠습니까?")) {
                    setWidgetProps((widgetProps: any) =>
                        widgetProps.map((mapItem: any) =>
                            mapItem.widgetId === widgetId
                                ? {
                                      ...mapItem,
                                      chartType: selectedChartType[0],
                                      apiKey: {
                                          ...mapItem.apiKey,
                                          keys: selectedApiKeys,
                                      },
                                  }
                                : mapItem
                        )
                    );
                    setFalse();
                }
                break;

            default:
                break;
        }
    };
    return (
        <WidgetPropsButtonsBlock>
            <Button onClick={setFalse}>취소</Button>
            <Button onClick={onClickConfirm}>확인</Button>
        </WidgetPropsButtonsBlock>
    );
};

const WidgetPropsButtonsBlock = styled.div``;
export default WidgetPropsButtons;
