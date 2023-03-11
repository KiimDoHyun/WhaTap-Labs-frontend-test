// Widget
// ! Widget을 위한 타입 정의 파일이지만 전역 타입 처럼 사용중이다.
/*
Widget
useHandleWidgetApi
WidgetProvider

DashboardHeader
DatePickerArea
DatePickerTitle
*/
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

export interface DataType {
    key: string;
    name: string;
    data: number;
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
    widgetId: number;
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
