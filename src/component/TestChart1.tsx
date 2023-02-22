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

    // 조회 에러 발생: 갱신 X

    const apiObj = (type: string) => {
        return {
            callApi: () => api.spot(type),
            success: (newValue: any) =>
                setData((prevState) =>
                    prevState.map((item) =>
                        item.name === type ? { ...item, value: newValue } : item
                    )
                ),
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };

    // 필요데이터 조회: act (액티브 스테이터스)
    useEffect(() => {
        setInterval(() => {
            arr.push(apiObj("act_method"));
        }, 500);
        setInterval(() => {
            arr.push(apiObj("act_sql"));
        }, 500);
        setInterval(() => {
            arr.push(apiObj("act_httpc"));
        }, 500);
        setInterval(() => {
            arr.push(apiObj("act_dbc"));
        }, 500);
        setInterval(() => {
            arr.push(apiObj("act_socket"));
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
                <div>
                    {data[0].name}: {data[0].value}
                </div>
                <div>
                    {data[1].name}: {data[1].value}
                </div>
                <div>
                    {data[2].name}: {data[2].value}
                </div>
                <div>
                    {data[3].name}: {data[3].value}
                </div>
                <div>
                    {data[4].name}: {data[4].value}
                </div>
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
