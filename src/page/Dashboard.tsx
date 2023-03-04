import { useEffect, useState } from "react";
import Widget from "../component/Widget";
import { WidgetPropsType } from "../types/widget";
import styled from "styled-components";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
import { createDateObj, getDateRange } from "../common/date";

const Dashboard = () => {
    // default: 10분전 ~ 현재
    const { startDate, endDate } = getDateRange();

    const [callApiObject, setCallApiObject] = useState({
        status: "NOW", // NOW: 실시간 / PAST : 과거(특정 구간) / STOP: 정지
        pastBody: {
            startDate: createDateObj(new Date(startDate)),
            endDate: createDateObj(new Date(endDate)),
        },
        nowBody: { range: 10 },
    });

    // 실시간 조회 범위구간 (기본 10분)
    const [selectedRealTime, setSelectedRealTime] = useState(10);

    // 타입을 지정하지 않으면 chartType 이 string이 된다. (자동 추론)
    // 실제 타입은 특정 값만 받도록 되어있기 때문에 에러가 발생한다.
    // 명시적으로 타입을 지정해서 해결한다.
    const barChartProps: WidgetPropsType = {
        callApiObject,
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
        callApiObject,
        chartType: "INFO",
        apiKey: {
            type: "spot",
            keys: ["act_agent", "inact_agent", "host", "cpucore"],
        },
    };

    const lineChartProps: WidgetPropsType = {
        callApiObject,
        chartType: "LINE",
        apiKey: {
            type: "spot",
            keys: ["cpu"],
        },
    };

    return (
        <DashboardBox>
            <DashboardHeader
                selectedRealTime={selectedRealTime}
                setSelectedRealTime={setSelectedRealTime}
                callApiObject={callApiObject}
                setCallApiObject={setCallApiObject}
            />

            <Widget {...barChartProps} />
            <Widget {...infoChartProps} />
            <Widget {...lineChartProps} />
        </DashboardBox>
    );
};

const DashboardBox = styled.div``;

export default Dashboard;
