import {
    axisBottom,
    axisLeft,
    axisTop,
    line,
    max,
    scaleBand,
    scaleLinear,
    select,
} from "d3";
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

    /*
    값 중복이 있는 경우 어떻게 고유하게 값을 지정할지

    12
    7
    7
    4

    -> 7 값이 서로다른 2개가 아닌 한개의 막대차트만 그림
    */
    const updateChart = (newData: any) => {
        const svg: any = select(svgRef.current);

        const xScale = scaleBand() // x 축
            .domain(newData.map((item: any) => String(item.name)))
            .range([20, 480]);

        const yMax = max(newData, function (d: any) {
            return d.value;
        });

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([70, 480]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .attr("width", "100%")
            .attr("opacity", 0)
            .call(yAxis);

        svg.selectAll(".bar")
            .data(newData)
            // css: trasition: 500 과 동일함
            .transition()
            .duration(500)
            // 모든 데이터가 변경되는 경우 딜레이를 추가할 수 있음.
            // .delay((d: any, i: any) => i * 100)
            .attr("class", "bar")
            // 첫번째 인자에 배열의 요소가, 두번째 인자에 인덱스가 들어있음.
            .attr("width", function (d: any, i: any) {
                return yScale(d.value) - 70;
                // return d.value;
            }) // 높이는 각 값의 *5 만큼 크기로
            .attr("height", 25) // 너비는 25로
            .attr("y", function (d: any, i: any) {
                return xScale(d.name) + 37;
            }); // x 위치는 해당 값의 x축의 위치로

        svg.selectAll(".text")
            .data(newData)
            .transition()
            .duration(500)
            .attr("class", "text")
            .text(function (d: any) {
                return d.value;
            });
    };

    // 필요데이터 조회: act (액티브 스테이터스)
    // 최대값 기준
    useEffect(() => {
        // setInterval(() => {
        //     arr.push(apiObj("act_method"));
        // }, 5000);
        // setInterval(() => {
        //     arr.push(apiObj("act_sql"));
        // }, 5000);
        // setInterval(() => {
        //     arr.push(apiObj("act_httpc"));
        // }, 5000);
        // setInterval(() => {
        //     arr.push(apiObj("act_dbc"));
        // }, 5000);
        // setInterval(() => {
        //     arr.push(apiObj("act_socket"));
        // }, 5000);

        // 막대 차트
        const svg: any = select(svgRef.current);

        const xScale = scaleBand() // x 축
            .domain(data.map((item) => `${item.name}`))
            .range([20, 480]);

        const xAxis = axisLeft(xScale).ticks(4);
        svg.select(".x-axis")
            // .style("transform", "translateY(450px)")
            .attr("transform", "translate(70, 0)")
            .call(xAxis);

        const yScale = scaleLinear().domain([0, 10]).range([70, 480]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .attr("width", "100%")
            .attr("transform", "translate(0, 20)")
            .attr("opacity", 0)
            .call(yAxis);

        // 텍스트 추가해보기

        let bar = svg
            .selectAll(".item")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "item");

        bar.append("rect")
            .attr("class", "bar")
            // 첫번째 인자에 배열의 요소가, 두번째 인자에 인덱스가 들어있음.
            .attr("width", function (d: any, i: any) {
                return d.value;
            }) // 높이는 각 값의 *5 만큼 크기로
            .attr("height", 25) // 너비는 25로
            .attr("y", function (d: any, i: any) {
                return xScale(d.name) + 37;
            }) // x 위치는 해당 값의 x축의 위치로
            .attr("x", function (d: any, i: any) {
                return 70;
            }); // y 는 원래 높이에서 해당 높이를 뺀 만큼

        bar.append("text")
            .attr("class", "text")
            .text(function (d: any) {
                return d.value;
            })
            .attr("fill", "#919191")
            .attr("x", 80)
            .attr("y", function (d: any, i: any) {
                return xScale(d.name) + 54;
            });
    }, []);

    return (
        <div>
            <div>
                액티브 스테이터스 <div className="infoIcon"></div>
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
