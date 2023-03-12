import React from "react";
import DashboardProvider from "./DashboardProvider";
import WidgetPropsSettingModalProvider from "./WidgetPropsSettingModalProvider";
import WidgetProvider from "./WidgetProvider";

const contexts = [
    DashboardProvider,
    WidgetProvider,
    WidgetPropsSettingModalProvider,
];

const GlobalProvider = ({ children }: { children: React.ReactNode }) =>
    contexts.reduce(
        (prev, context) =>
            React.createElement(context, {
                children: prev,
            }),
        children
    );

export default GlobalProvider;
