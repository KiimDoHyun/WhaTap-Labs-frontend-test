import React, { useEffect, useRef, useState } from "react";
import api from "../api";

const callApi = async (api: any, callback: any) => {
    try {
        await api();
        callback();
    } catch {
        console.warn("api 호출 실패");
    }
};

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
        // setInterval(() => {
        //     api.spot("act_method").then((result) => {
        //         console.log(result);
        //         setData((prevState) =>
        //             prevState.map((item) =>
        //                 item.name === "act_method"
        //                     ? { ...item, value: result.data }
        //                     : item
        //             )
        //         );
        //     });
        // }, 0.1);
        // setInterval(() => {
        //     api.spot("act_sql").then((result) => {
        //         console.log(result);
        //         setData((prevState) =>
        //             prevState.map((item) =>
        //                 item.name === "act_sql"
        //                     ? { ...item, value: result.data }
        //                     : item
        //             )
        //         );
        //     });
        // }, 0.2);
        // setInterval(() => {
        //     api.spot("act_httpc").then((result) => {
        //         console.log(result);
        //         setData((prevState) =>
        //             prevState.map((item) =>
        //                 item.name === "act_httpc"
        //                     ? { ...item, value: result.data }
        //                     : item
        //             )
        //         );
        //     });
        // }, 0.3);
        // setInterval(() => {
        //     api.spot("act_dbc").then((result) => {
        //         console.log(result);
        //         setData((prevState) =>
        //             prevState.map((item) =>
        //                 item.name === "act_dbc"
        //                     ? { ...item, value: result.data }
        //                     : item
        //             )
        //         );
        //     });
        // }, 0.4);
        // setInterval(() => {
        //     api.spot("act_socket").then((result) => {
        //         console.log(result);
        //         setData((prevState) =>
        //             prevState.map((item) =>
        //                 item.name === "act_socket"
        //                     ? { ...item, value: result.data }
        //                     : item
        //             )
        //         );
        //     });
        // }, 0.5);
    }, []);

    useEffect(() => {
        console.log("data: ", data);
    }, [data]);

    const onClick = () => {
        //
    };
    /*
    크기

    default
    500 * 500

    */
    return (
        <div>
            <button onClick={onClick}>추가</button>
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
