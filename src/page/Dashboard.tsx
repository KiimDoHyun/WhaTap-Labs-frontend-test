import { useEffect, useState } from "react";
import Widget from "../component/Widget";
import { WidgetPropsType } from "../types/widget";
import styled from "styled-components";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
const Dashboard = () => {
    // default: 10분전 ~ 현재
    const start = new Date(Date.now() - 1000 * 60 * 10);
    const end = new Date(Date.now());

    // 실시간 조회 여부
    const [isCallRealTime, setIsCallRealTime] = useState(true);

    // 조회 범위
    const [startDate, setStartDate] = useState({
        year: start.getFullYear(),
        month: `0${start.getMonth() + 1}`.slice(-2),
        date: `0${start.getDate()}`.slice(-2),
        hour: `0${start.getHours()}`.slice(-2),
        min: `0${start.getMinutes()}`.slice(-2),
    });

    const [endDate, setEndDate] = useState({
        year: end.getFullYear(),
        month: `0${end.getMonth() + 1}`.slice(-2),
        date: `0${end.getDate()}`.slice(-2),
        hour: `0${end.getHours()}`.slice(-2),
        min: `0${end.getMinutes()}`.slice(-2),
    });

    // 타입을 지정하지 않으면 chartType 이 string이 된다. (자동 추론)
    // 실제 타입은 특정 값만 받도록 되어있기 때문에 에러가 발생한다.
    // 명시적으로 타입을 지정해서 해결한다.
    const barChartProps: WidgetPropsType = {
        isCallRealTime: isCallRealTime,
        startDate: startDate,
        endDate: endDate,
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
        isCallRealTime: isCallRealTime,
        startDate: startDate,
        endDate: endDate,
        chartType: "INFO",
        apiKey: {
            type: "spot",
            keys: ["act_agent", "inact_agent", "host", "cpucore"],
        },
    };

    const lineChartProps: WidgetPropsType = {
        isCallRealTime: isCallRealTime,
        startDate: startDate,
        endDate: endDate,
        chartType: "LINE",
        apiKey: {
            type: "spot",
            keys: ["cpu"],
        },
    };

    return (
        <DashboardBox>
            <DashboardHeader
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                isCallRealTime={isCallRealTime}
                setIsCallRealTime={setIsCallRealTime}
            />

            <Widget {...barChartProps} />
            <Widget {...infoChartProps} />
            <Widget {...lineChartProps} />
        </DashboardBox>
    );
};

const DashboardBox = styled.div``;

export default Dashboard;
