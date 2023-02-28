import React, { useEffect, useState } from "react";
import Widget from "../component/Widget";
import { WidgetPropsType } from "../types/widget";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Calendar from "react-calendar";
import DatePicker from "../common/DatePicker";
const Dashboard = () => {
    {
        /* 호출 구간 설정 */
    }
    {
        /* 시작 / 종료 구간 지정 */
    }

    const now = new Date();
    // 조회 범위
    // default: 10분전 ~ 현재
    const [startTime, setStartTime] = useState(Date.now() - 1000 * 60 * 10);
    const [endTime, setEndTime] = useState(
        `${now.getHours()} : ${now.getMinutes()}`
    );

    console.log("now: ", Date.now());
    console.log("hour: ", now.getHours());
    console.log("min: ", now.getMinutes());
    // 타입을 지정하지 않으면 chartType 이 string이 된다. (자동 추론)
    // 실제 타입은 특정 값만 받도록 되어있기 때문에 에러가 발생한다.
    // 명시적으로 타입을 지정해서 해결한다.
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

    useEffect(() => {
        console.log("endTime :", endTime);
    }, [endTime]);

    return (
        <>
            <InputGroup>
                <Form.Control
                    type="time"
                    value={startTime}
                    onChange={(e: any) => {
                        setStartTime(e.target.value);
                    }}
                />
                <Form.Control
                    type="time"
                    value={endTime}
                    onChange={(e: any) => {
                        setEndTime(e.target.value);
                    }}
                />
                <Form.Control type="date" />
                <Form.Control type="time" />
            </InputGroup>
            <input type={"date"} />
            <input type={"time"} />
            <input type={"time"} value={Date.now()} step="1" />

            <DatePicker />
            <Widget {...barChartProps} />
        </>
    );
};

export default Dashboard;
