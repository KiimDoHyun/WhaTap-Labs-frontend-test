import React, { useEffect, useRef, useState } from "react";
import { arr } from "..";
import api from "../api";

const TestChart1 = () => {
    const svgRef = useRef(null);
    const [data, setData] = useState([
        {
            name: "act_method",
            value: 0,
        },
        {
            name: "act_sql",
            value: 0,
        },
        {
            name: "act_httpc",
            value: 0,
        },
        {
            name: "act_dbc",
            value: 0,
        },
        {
            name: "act_socket",
            value: 0,
        },
    ]);

    // 필요데이터 조회: act (액티브 스테이터스)
    useEffect(() => {
        setInterval(() => {
            arr.push(111);
        }, 500);
        setInterval(() => {
            arr.push(222);
        }, 500);
        setInterval(() => {
            arr.push(333);
        }, 500);
        setInterval(() => {
            arr.push(444);
        }, 500);
        setInterval(() => {
            arr.push(555);
        }, 500);
    }, []);

    useEffect(() => {
        console.log("data: ", data);
    }, [data]);

    /*
    크기

    default
    500 * 500

    */
    return (
        <div>
            <div>
                데이터베이스 <div className="infoIcon"></div>
            </div>
            <div style={{ height: "500px", width: "500px" }}>
                <svg ref={svgRef}>
                    <g className="y-axis" />
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    );
};

export default TestChart1;
