// Widget
type ChartType = "BAR" | "LINE" | "INFO";

interface ApiKeyObjectType {
    [key: string]: string[];
}

interface ApiKeyType extends ApiKeyObjectType {
    spot?: string[];
    series?: string[];
}

export interface WidgetPropsType {
    chartType: ChartType;
    apiKey: ApiKeyType;
}

// Widget Modal
export interface WidgetModalPropsType {}
