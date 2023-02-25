import React, { useEffect, useState } from "react";
import { queue } from "..";
import api from "../api";

const TestChart3 = () => {
    const [data, setData] = useState([
        {
            name: "act_agent",
            value: 0,
        },
        {
            name: "inact_agent",
            value: 0,
        },
        {
            name: "host",
            value: 0,
        },
        {
            name: "cpucore",
            value: 0,
        },
    ]);

    const createApi = (type: string) => {
        return {
            callApi: () => api.spot(type),
            success: (newValue: any) =>
                setData((prevState) => {
                    const newData = prevState.map((item) =>
                        item.name === type ? { ...item, value: newValue } : item
                    );

                    return newData;
                }),
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };
    // 인포메틱스
    useEffect(() => {
        setInterval(() => {
            queue.push(createApi("act_agent"));
        }, 5000);
        setInterval(() => {
            queue.push(createApi("inact_agent"));
        }, 5000);
        setInterval(() => {
            queue.push(createApi("host"));
        }, 5000);
        setInterval(() => {
            queue.push(createApi("cpucore"));
        }, 5000);
    }, []);

    useEffect(() => {
        console.log("data :", data);
    }, [data]);
    return <>TestChart3</>;
};

export default TestChart3;
