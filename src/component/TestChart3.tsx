import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { queue } from "..";
import api from "../api";

const TestChart3 = () => {
    const [data, setData] = useState([
        {
            name: "act_agent",
            title: "활성화 상태의 에이전트 수",
            value: 0,
        },
        {
            name: "inact_agent",
            title: "비활성화 상태의 에이전트 수",
            value: 0,
        },
        {
            name: "host",
            title: "호스트 수",
            value: 0,
        },
        {
            name: "cpucore",
            title: "호스트의 CPU 코어 합",
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
    return (
        <TestChart3Box>
            {data.map((item) => (
                <InformaticsBox key={item.name}>
                    <div className="title">{item.title}</div>
                    <div className="value">{item.value}</div>
                </InformaticsBox>
            ))}
        </TestChart3Box>
    );
};

const TestChart3Box = styled.div`
    width: 100px;
    box-sizing: border-box;
    border-top: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
`;

const InformaticsBox = styled.div`
    border-bottom: 1px solid;
    padding: 8px;
    box-sizing: border-box;

    .title {
        font-size: 12px;
    }

    .value {
        text-align: right;
    }
`;

export default TestChart3;
