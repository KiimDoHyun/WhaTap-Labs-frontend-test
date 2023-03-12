// ! 차트컴포넌트들을 위한 타입 정의 파일이지만 useHandleWidgetApi 에서도 사용중이다.
// 차트에 사용할 dataSource
export interface dataSourceType {
    key: string;
    data: number | null;
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

// Line
export interface LineChartPropsType {
    dataSource: dataSourceType[];
    startDate: Date;
    endDate: Date;
    dif: string;
}

// Common
export interface ChartPropsType {
    dataSource: dataSourceType[];
}
