// Widget
type ChartType = "BAR" | "LINE" | "INFO";

interface ApiKeyType {
    type: string;
    keys: string[];
}

interface dateType {
    year: number;
    month: string;
    date: string;
    hour: string;
    min: string;
    sec: string;
}

export interface callApiObjectType {
    status: string;
    pastBody: {
        startDate: dateType;
        endDate: dateType;
    };
    nowBody: {
        range: number;
    };
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
    onClickApplyCallCycle: (inputValue: number) => void;
}
