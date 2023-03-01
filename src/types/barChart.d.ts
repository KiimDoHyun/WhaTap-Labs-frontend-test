export interface dataSourceType {
    key: string;
    data: any;
    name: string;
}

export interface BarChartPropsType {
    dataSource: dataSourceType[];
}

export interface ChartPropsType {
    svgRef: React.MutableRefObject<any>;
}
