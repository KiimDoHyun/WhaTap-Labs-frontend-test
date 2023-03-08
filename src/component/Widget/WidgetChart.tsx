import BarChart from "../chart/BarChart";
import InformaticsChart from "../chart/InformaticsChart";
import LineChart from "../chart/LineChart";

interface WidgetChartPropsType {
    chartType: string;
    dataSource: {
        key: string;
        data: any;
        name: string;
    }[];
    apiInfo: {
        startDate: any;
        endDate: any;
        dif: number;
        callCycle: number;
    };
}

const WidgetChart = ({
    chartType,
    dataSource,
    apiInfo,
}: WidgetChartPropsType) => {
    switch (chartType) {
        case "BAR":
            return <BarChart dataSource={dataSource} apiInfo={apiInfo} />;
        case "LINE":
            return <LineChart dataSource={dataSource} apiInfo={apiInfo} />;
        case "INFO":
            return (
                <InformaticsChart dataSource={dataSource} apiInfo={apiInfo} />
            );
        default:
            return;
    }
};

export default WidgetChart;
