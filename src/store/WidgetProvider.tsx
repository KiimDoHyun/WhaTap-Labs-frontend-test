import React, { createContext, useState, useCallback } from "react";
import { WidgetPropsType } from "../types/widget";

export const WidgetStateContext = createContext(null);
export const WidgetSetterContext = createContext(null);

type chartPropsKey =
    | "dataSource"
    | "startDate"
    | "endDate"
    | "dif"
    | "callCycle";

interface ProviderPropsType {
    children: React.ReactNode;
}

const WidgetProvider = ({ children }: ProviderPropsType) => {
    // 위젯 설정(차트타입, 호출할 api 종류)
    const [widgetProps, setWidgetProps] = useState<WidgetPropsType[]>([
        {
            widgetId: Math.random(),
            chartType: "LINE",
            apiKey: {
                type: "spot",
                keys: ["cpu"],
            },
        },
    ]);
    // 위젯 추가
    // 위젯 삭제
    // 위젯 수정

    const deleteWidgetProps = useCallback((widgetId: number) => {
        setWidgetProps((widgetProps) =>
            widgetProps.filter((filterItem) => filterItem.widgetId !== widgetId)
        );
    }, []);

    return (
        <WidgetSetterContext.Provider
            value={{ setWidgetProps, deleteWidgetProps }}
        >
            <WidgetStateContext.Provider value={{ widgetProps }}>
                {children}
            </WidgetStateContext.Provider>
        </WidgetSetterContext.Provider>
    );
};

export default WidgetProvider;
