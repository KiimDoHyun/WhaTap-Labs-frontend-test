// 차트에 사용할 dataSource
export interface dataSourceType {
    key: string;
    data: number;
    name: string;
}

// Bar
export interface BarChartPropsType {
    dataSource: dataSourceType[];
}

// Info
export interface InformaticsChartPropsType {
    dataSource: dataSourceType[];
}

export interface InformaticsChartBoxPropsType {
    item: dataSourceType;
}

// Common
export interface ChartPropsType {
    svgRef: React.MutableRefObject<any>;
}