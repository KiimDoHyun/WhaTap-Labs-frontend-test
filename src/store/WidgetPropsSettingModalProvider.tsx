import React, { createContext, useCallback, useState } from "react";
import useBoolean from "../hook/useBoolean";

// 위젯 차트타입/api 설정
export const WidgetPropsSettingModalStateContext = createContext(null);
export const WidgetPropsSettingModalSetterContext = createContext(null);

interface ProviderPropsType {
    children: React.ReactNode;
}

const WidgetPropsSettingModalProvider = ({ children }: ProviderPropsType) => {
    // 모달 제어 변수
    const {
        state: activeWidgetSettingModal,
        setTrue,
        setFalse,
    } = useBoolean(false);

    // 모달 내부에서 사용할 데이터
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

    // 모달 활성화(데이터 바인딩 + flag -> true)
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

    return (
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
                }}
            >
                {children}
            </WidgetPropsSettingModalSetterContext.Provider>
        </WidgetPropsSettingModalStateContext.Provider>
    );
};

export default WidgetPropsSettingModalProvider;
