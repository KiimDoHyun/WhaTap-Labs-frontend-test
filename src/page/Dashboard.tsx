import { useState } from "react";
import Widget from "../component/Widget";
import { WidgetPropsType } from "../types/widget";
import styled from "styled-components";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
const Dashboard = () => {
    const start = new Date(Date.now() - 1000 * 60 * 10);
    const end = new Date(Date.now());
    // 조회 범위
    // default: 10분전 ~ 현재
    const [startDate, setStartDate] = useState({
        year: start.getFullYear(),
        month: start.getMonth() + 1,
        date: start.getDate(),
        hour: start.getHours(),
        min: start.getMinutes(),
    });

    const [endDate, setEndDate] = useState({
        year: end.getFullYear(),
        month: end.getMonth() + 1,
        date: end.getDate(),
        hour: end.getHours(),
        min: end.getMinutes(),
    });

    // console.log("before: ", Date.now() - 1000 * 60 * 10);
    // console.log("now: ", Date.now());
    // console.log("hour: ", now.getHours());
    // console.log("min: ", now.getMinutes());

    // 타입을 지정하지 않으면 chartType 이 string이 된다. (자동 추론)
    // 실제 타입은 특정 값만 받도록 되어있기 때문에 에러가 발생한다.
    // 명시적으로 타입을 지정해서 해결한다.
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

    return (
        <DashboardBox>
            <DashboardHeader
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            <Widget {...barChartProps} />
        </DashboardBox>
    );
};

const DashboardBox = styled.div``;

export default Dashboard;
