import React, { createContext, useState, useCallback } from "react";

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
    const [chartProps, setChartProps] = useState({
        dataSource: [
            {
                key: "",
                data: null,
                name: "",
            },
        ],
        startDate: null,
        endDate: null,
        dif: 0,
        callCycle: 0,
    });

    const changeChartProps = useCallback(
        ({ key, value }: { key: chartPropsKey; value: any }) => {
            console.log("key: ", key);
            console.log("value: ", value);
            setChartProps((chartProps) => ({
                ...chartProps,
                [key]: value,
            }));
        },
        []
    );
    return (
        <WidgetSetterContext.Provider value={changeChartProps}>
            <WidgetStateContext.Provider value={chartProps}>
                {children}
            </WidgetStateContext.Provider>
        </WidgetSetterContext.Provider>
    );
};

export default WidgetProvider;
