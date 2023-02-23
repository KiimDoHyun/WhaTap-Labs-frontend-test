import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
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
            value: 1,
        },
        {
            name: "act_httpc",
            value: 2,
        },
        {
            name: "act_dbc",
            value: 3,
        },
        {
            name: "act_socket",
            value: 4,
        },
    ]);

    // 조회 에러 발생: 갱신 X
    // api 호출 생성 함수
    const apiObj = (type: string) => {
        return {
            callApi: () => api.spot(type),
            success: (newValue: any) =>
                setData((prevState) => {
                    const newData = prevState.map((item) =>
                        item.name === type ? { ...item, value: newValue } : item
                    );
                    updateChart(newData);

                    return newData;
                }),
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };

    const updateChart = (newData: any) => {
        const svg: any = select(svgRef.current);

        const xScale = scaleBand() // x 축
            .domain(newData.map((item: any) => String(item.value)))
            .range([50, 450]);
        // .padding(0.5);

        const xAxis = axisBottom(xScale).ticks(4);
        svg.select(".x-axis")
            .style("transform", "translateY(450px)")
            .call(xAxis);

        svg.selectAll(".bar")
            .data(newData)
            // css: trasition: 500 과 동일함
            .transition()
            .duration(500)
            // 모든 데이터가 변경되는 경우 딜레이를 추가할 수 있음.
            .delay((d: any, i: any) => i * 100)
            .attr("class", "bar")
            // 첫번째 인자에 배열의 요소가, 두번째 인자에 인덱스가 들어있음.
            .attr("height", function (d: any, i: any) {
                return d.value;
            }) // 높이는 각 값의 *5 만큼 크기로
            .attr("width", 25) // 너비는 25로
            .attr("x", function (d: any, i: any) {
                console.log(i * 25);
                console.log("? value22", xScale("0"));
                // return i * 25;
                return xScale(String(d.value));

                console.log("? value22", xScale(d.value));
                console.log("? name22", xScale(d.name));
                return xScale(d.name) + 25;
            }) // x 위치는 해당 값의 x축의 위치로
            .attr("y", function (d: any, i: any) {
                return 450 - d.value;
            }); // y 는 원래 높이에서 해당 높이를 뺀 만큼
    };

    // 필요데이터 조회: act (액티브 스테이터스)
    useEffect(() => {
        setInterval(() => {
            arr.push(apiObj("act_method"));
        }, 5000);
        setInterval(() => {
            arr.push(apiObj("act_sql"));
        }, 5000);
        setInterval(() => {
            arr.push(apiObj("act_httpc"));
        }, 5000);
        setInterval(() => {
            arr.push(apiObj("act_dbc"));
        }, 5000);
        setInterval(() => {
            arr.push(apiObj("act_socket"));
        }, 5000);

        // 막대 차트
        const svg: any = select(svgRef.current);

        const xScale = scaleBand() // x 축
            .domain(data.map((item) => String(item.value)))
            .range([50, 450]);

        const yScale = scaleLinear() // y 축
            .domain([0, 200]) // 실제값의 범위, // 최대값 찾아서 범위 지정?
            .range([450, 50]); // 차트를 그리기 위해 크기를 지정.

        const xAxis = axisBottom(xScale).ticks(4);
        svg.select(".x-axis")
            .style("transform", "translateY(450px)")
            .call(xAxis);

        // const yAxis = axisLeft(yScale);
        // svg.select(".y-axis")
        //     .attr("height", "100%")
        //     .attr("transform", "translate(50, 0)")
        //     .call(yAxis);

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            // 작동 X
            // .transition()
            // .duration(500)
            .attr("class", "bar")
            // 첫번째 인자에 배열의 요소가, 두번째 인자에 인덱스가 들어있음.
            .attr("height", function (d: any, i: any) {
                return d.value;
            }) // 높이는 각 값의 *5 만큼 크기로
            .attr("width", 25) // 너비는 25로
            .attr("x", function (d: any, i: any) {
                return i * 25;
                console.log("? value", xScale(d.value)!);
                console.log("? name", xScale(d.name)!);
                return xScale(d.value);
                // return xScale(d.name) + 25;
            }) // x 위치는 해당 값의 x축의 위치로
            .attr("y", function (d: any, i: any) {
                return 450 - d.value;
            }); // y 는 원래 높이에서 해당 높이를 뺀 만큼
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
                액티브 스테이터스 <div className="infoIcon"></div>
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
                <svg ref={svgRef} style={{ height: "100%", width: "100%" }}>
                    <g className="y-axis" />
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    );
};

export default TestChart1;
