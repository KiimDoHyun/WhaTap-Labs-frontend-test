import Widget from "../component/Widget";
import { WidgetPropsType } from "../types/widget";
import styled from "styled-components";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
import DashboardProvider from "../store/DashboardProvider";

const Dashboard = () => {
    const barChartProps: WidgetPropsType = {
        chartType: "BAR",
        apiKey: {
            type: "spot",
            keys: [
                "act_method",
                "act_sql",
                "act_httpc",
                "act_dbc",
                "act_socket",
            ],
        },
    };

    const infoChartProps: WidgetPropsType = {
        chartType: "INFO",
        apiKey: {
            type: "spot",
            keys: ["act_agent", "inact_agent", "host", "cpucore"],
        },
    };

    const lineChartProps: WidgetPropsType = {
        chartType: "LINE",
        apiKey: {
            type: "spot",
            keys: ["cpu"],
        },
    };

    return (
        <DashboardProvider>
            <DashboardBox>
                <DashboardHeader />

                <Widget {...barChartProps} />
                <Widget {...infoChartProps} />
                <Widget {...lineChartProps} />
            </DashboardBox>
        </DashboardProvider>
    );
};

const DashboardBox = styled.div``;

export default Dashboard;
