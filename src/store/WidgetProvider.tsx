import React, { createContext, useState, useCallback } from "react";
import useBoolean from "../hook/useBoolean";
import { WidgetPropsType } from "../types/widget";

export const WidgetStateContext = createContext(null);
export const WidgetSetterContext = createContext(null);

// 위젯 차트타입/api 설정
export const WidgetPropsSettingModalStateContext = createContext(null);
export const WidgetPropsSettingModalSetterContext = createContext(null);

// 호출 주기 설정
export const WidgetSettingModalStateContext = createContext(null);
export const WidgetSettingModalSetterContext = createContext(null);

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
    // 위젯
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

    // 위젯 설정 모달(추가/수정)
    // 위젯 차트타입/api 설정
    const {
        state: activeWidgetSettingModal,
        setTrue,
        setFalse,
    } = useBoolean(false);

    const [activeWidgetSettingModalValue, setActiveWidgetSettingModalValue] =
        useState({
            type: "ADD",
            chartType: "",
            apiKeys: {
                type: "spot",
                keys: [],
            },
            widgetId: 0,
        });

    const setTrueActiveWidgetSettingModal = useCallback(
        (
            type: string,
            widgetId: number,
            chartType: string = "",
            apiKeys: any = {
                type: "spot",
                keys: [],
            }
        ) => {
            setActiveWidgetSettingModalValue({
                type,
                chartType,
                apiKeys,
                widgetId,
            });
            setTrue();
        },
        []
    );

    const deleteWidgetProps = useCallback((widgetId: number) => {
        setWidgetProps((widgetProps) =>
            widgetProps.filter((filterItem) => filterItem.widgetId !== widgetId)
        );
    }, []);

    // 호출 주기 설정
    const {
        state: activeWidgetModal,
        setTrue: setTrueActiveWidgetModal,
        setFalse: setFalseActiveWidgetModal,
    } = useBoolean(false);

    return (
        <WidgetSetterContext.Provider value={{ setWidgetProps }}>
            <WidgetStateContext.Provider value={{ widgetProps }}>
                <WidgetPropsSettingModalStateContext.Provider
                    value={{
                        activeWidgetSettingModal,
                        activeWidgetSettingModalValue,
                    }}
                >
                    <WidgetPropsSettingModalSetterContext.Provider
                        value={{
                            setTrueActiveWidgetSettingModal,
                            setFalse,
                            deleteWidgetProps,
                        }}
                    >
                        <WidgetSettingModalStateContext.Provider
                            value={{ activeWidgetModal }}
                        >
                            <WidgetSettingModalSetterContext.Provider
                                value={{
                                    setTrueActiveWidgetModal,
                                    setFalseActiveWidgetModal,
                                }}
                            >
                                {children}
                            </WidgetSettingModalSetterContext.Provider>
                        </WidgetSettingModalStateContext.Provider>
                    </WidgetPropsSettingModalSetterContext.Provider>
                </WidgetPropsSettingModalStateContext.Provider>
            </WidgetStateContext.Provider>
        </WidgetSetterContext.Provider>
    );
};

export default WidgetProvider;
