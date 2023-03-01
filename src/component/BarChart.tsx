import { axisLeft, axisTop, max, scaleBand, scaleLinear, select } from "d3";
import React, { useEffect, useRef } from "react";
import api from "../api";
import styled from "styled-components";
import useResize from "../hook/useResize";

const margin = { top: 20, right: 20, bottom: 20, left: 70 };

let data: any = null;

const Chart = React.memo(({ svgRef }: any) => {
    return (
        <svg ref={svgRef}>
            <g className="y-axis" />
            <g className="x-axis" />
        </svg>
    );
});

const BarChart = ({ dataSource }: any) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    // resize
    // !데이터 바인딩 함수와 중복되는 부분 다수 존재
    const responseiveDraw = (parentWidth: any, parentHeight: any) => {
        if (data === null) return;

        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleBand() // x 축
            .domain(data.map((item: any) => `${item.name}`))
            .range([0, height]);

        const xAxis = axisLeft(xScale).ticks(4);
        svg.select(".x-axis")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(xAxis);

        const yMax = max(data, (d: any) => d.data);

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
                return d.data ? yScale(d.data) + margin.left : 0;
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

        console.log("data: ", data);

        const width =
            svgParentBoxRef.current.offsetWidth - margin.left - margin.right;
        const height =
            svgParentBoxRef.current.offsetHeight - margin.top - margin.bottom;

        const xScale = scaleBand() // x 축
            .domain(data.map((item: any) => `${item.name}`))
            .range([0, height]);

        const xAxis = axisLeft(xScale).ticks(4);
        svg.select(".x-axis")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(xAxis);

        const yMax = max(data, (d: any) => d.data);

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .attr("width", "100%")
            .attr("opacity", 0)
            .call(yAxis);

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
            .attr("x", margin.left)
            .attr("y", function (d: any) {
                return xScale(d.name) + margin.top + margin.bottom;
            });

        // 텍스트가 들어갈 요소 생성
        bar.append("text")
            .attr("class", "text")
            .attr("x", margin.left + 10)
            .attr("fill", "#919191");
    };

    // 데이터 바인딩
    const updateChart = () => {
        const svg: any = select(svgRef.current);

        const parentWidth = svgParentBoxRef.current.offsetWidth;

        const width = parentWidth - margin.left - margin.right;

        const yMax = max(data, (d: any) => d.data) || 0;

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis").call(yAxis);

        // 막대차트 길이 갱신
        svg.selectAll(".bar")
            .data(data)
            .transition()
            .duration(500)
            .attr("width", function (d: any) {
                return d.data ? yScale(d.data) + margin.left : 0;
            });

        // 텍스트 갱신
        svg.selectAll(".text")
            .data(data)
            .transition()
            .duration(500)
            .text((d: any) => d.data);
    };

    // 필요데이터 조회: act (액티브 스테이터스)
    // 최대값 기준

    useEffect(() => {
        const { width, height } = size;

        // 차트 다시 그리기
        responseiveDraw(width, height);
    }, [size]);

    useEffect(() => {
        data = [...dataSource];

        // x,y 축 생성을 초기에 1회만?
        initChart();

        // 업데이트
        updateChart();
    }, [dataSource]);

    useEffect(() => {}, []);

    return (
        <BarChartBox>
            <div className="title">
                액티브 스테이터스 <div className="infoIcon"></div>
            </div>
            <div className="chart" ref={svgParentBoxRef}>
                <Chart svgRef={svgRef} />
                {/* <svg ref={svgRef}>
                    <g className="y-axis" />
                    <g className="x-axis" />
                </svg> */}
            </div>
        </BarChartBox>
    );
};
const BarChartBox = styled.div`
    width: 100%;
    height: 100%;

    min-width: 250px;
    min-height: 400px;

    position: relative;

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
