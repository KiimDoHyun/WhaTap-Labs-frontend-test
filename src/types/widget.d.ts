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
export interface WidgetModalPropsType {}
