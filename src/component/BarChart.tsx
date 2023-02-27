import { axisLeft, axisTop, max, scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef, useState } from "react";
import { queue } from "..";
import api from "../api";
import styled from "styled-components";
import useResize from "../hook/useResize";

const margin = { top: 20, right: 20, bottom: 20, left: 70 };

const BarChart = () => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

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

    // resize
    // !데이터 바인딩 함수와 중복되는 부분 다수 존재
    const responseiveDraw = (parentWidth: any, parentHeight: any) => {
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleBand() // x 축
            .domain(data.map((item) => `${item.name}`))
            .range([0, height]);

        const xAxis = axisLeft(xScale).ticks(4);
        svg.select(".x-axis")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(xAxis);

        const yMax = max(data, (d: any) => d.value);

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .attr("width", "100%")
            .attr("opacity", 0)
            .call(yAxis);

        svg.selectAll(".bar")
            .transition()
            .duration(500)
            .attr("y", function (d: any) {
                return xScale(d.name) + margin.top + margin.bottom;
            })
            .attr("width", function (d: any) {
                return d.value ? yScale(d.value) + margin.left : 0;
            });

        svg.selectAll(".text")
            .transition()
            .duration(500)
            .attr("y", function (d: any) {
                return xScale(d.name) + margin.top + margin.bottom + 17;
            });
    };

    // 초기화
    const initChart = () => {
        // 막대 차트
        const svg: any = select(svgRef.current);

        // 텍스트 추가해보기
        const bar = svg
            .selectAll(".item")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "item");

        // 바 생성
        bar.append("rect")
            .attr("class", "bar")
            .attr("height", 25) // 너비는 25로
            .attr("x", margin.left);

        // 텍스트가 들어갈 요소 생성
        bar.append("text")
            .attr("class", "text")
            .attr("x", margin.left + 10)
            .attr("fill", "#919191");
    };

    // 데이터 바인딩
    const updateChart = (newData: any) => {
        const svg: any = select(svgRef.current);

        const parentWidth = svgParentBoxRef.current.offsetWidth;

        const width = parentWidth - margin.left - margin.right;

        const yMax = max(newData, (d: any) => d.value);

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis").call(yAxis);

        // 막대차트 길이 갱신
        svg.selectAll(".bar")
            .data(newData)
            .transition()
            .duration(500)
            .attr("width", function (d: any) {
                return d.value ? yScale(d.value) + margin.left : 0;
            });

        // 텍스트 갱신
        svg.selectAll(".text")
            .data(newData)
            .transition()
            .duration(500)
            .text((d: any) => d.value);
    };

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

    // 필요데이터 조회: act (액티브 스테이터스)
    // 최대값 기준
    const isfirst = useRef(true);
    useEffect(() => {
        setInterval(() => {
            queue.push(apiObj("act_method"));
        }, 5000);
        setInterval(() => {
            queue.push(apiObj("act_sql"));
        }, 5000);
        setInterval(() => {
            queue.push(apiObj("act_httpc"));
        }, 5000);
        setInterval(() => {
            queue.push(apiObj("act_dbc"));
        }, 5000);
        setInterval(() => {
            queue.push(apiObj("act_socket"));
        }, 5000);

        initChart();
    }, []);

    useEffect(() => {
        const { width, height } = size;

        // 차트 다시 그리기
        responseiveDraw(width, height);
    }, [size]);

    return (
        <BarChartBox>
            <div className="title">
                액티브 스테이터스 <div className="infoIcon"></div>
            </div>
            <div className="chart" ref={svgParentBoxRef}>
                <svg ref={svgRef}>
                    <g className="y-axis" />
                    <g className="x-axis" />
                </svg>
            </div>
        </BarChartBox>
    );
};
const BarChartBox = styled.div`
    width: 100%;
    height: 100%;

    .title {
        height: 20px;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .chart {
        height: calc(100% - 30px);

        svg {
            width: 100%;
            height: 100%;
        }
    }
`;

export default BarChart;
