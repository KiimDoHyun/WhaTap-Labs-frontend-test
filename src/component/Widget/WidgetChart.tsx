// import { ChartDataSourceType } from "../../types/api";
import BarChart from "../chart/BarChart";
import InformaticsChart from "../chart/InformaticsChart";
import LineChart from "../chart/LineChart";

interface PropsType {
    chartType: string;
    dataSource: { key: string; name: string; data: number | null }[];
    apiInfo: {
        startDate: any;
        endDate: any;
        dif: number;
        callCycle: number;
    };
}

const WidgetChart = ({ chartType, dataSource, apiInfo }: PropsType) => {
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
