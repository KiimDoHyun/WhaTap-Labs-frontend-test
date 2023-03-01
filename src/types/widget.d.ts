// Widget
type ChartType = "BAR" | "LINE" | "INFO";

interface ApiKeyType {
    type: string;
    keys: string[];
}

export interface WidgetPropsType {
    chartType: ChartType;
    apiKey: ApiKeyType;
}

// Widget Modal
export interface WidgetModalPropsType {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    lastCallTime: object;
    isCallApi: boolean;
    setIsCallApi: React.Dispatch<React.SetStateAction<boolean>>;
    onClickApplyCallCycle: (inputValue: number) => void;
}
