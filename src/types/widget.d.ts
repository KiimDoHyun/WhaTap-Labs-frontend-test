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
}

export interface WidgetPropsType {
    isCallRealTime: boolean;
    startDate?: dateType;
    endDate?: dateType;
    isActiveSelectRange: boolean;
    isSearchSpecificSection: boolean;
    setIsSearchSpecificSection: React.Dispatch<React.SetStateAction<boolean>>;
    chartType: ChartType;
    apiKey: ApiKeyType;
    selectedRealTime: number;
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
