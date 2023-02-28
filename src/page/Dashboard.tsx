import React, { useState } from "react";
import Widget from "../component/Widget";
import { WidgetPropsType } from "../types/widget";

const Dashboard = () => {
    {
        /* 호출 구간 설정 */
    }
    {
        /* 시작 / 종료 구간 지정 */
    }

    // 조회 범위
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const barChartProps: WidgetPropsType = {
        chartType: "BAR",
        apiKey: {
            spot: [
                "act_method",
                "act_sql",
                "act_httpc",
                "act_dbc",
                "act_socket",
            ],
        },
    };

    return (
        <>
            <Widget {...barChartProps} />
        </>
    );
};

export default Dashboard;
