import { axisLeft, axisTop, max, scaleBand, scaleLinear, select } from "d3";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useResize from "../../hook/useResize";
import {
    BarChartPropsType,
    ChartPropsType,
    dataSourceType,
} from "../../types/chart";

const margin = { top: 20, right: 20, bottom: 20, left: 70 };

let data: dataSourceType[] = null;

const Chart = React.memo(({ svgRef }: ChartPropsType) => {
    return (
        <svg ref={svgRef}>
            <g className="y-axis" />
            <g className="x-axis" />
        </svg>
    );
});

const BarChart = ({ dataSource }: BarChartPropsType) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    // resize
    // !데이터 바인딩 함수와 중복되는 부분 다수 존재
    const responseiveDraw = (parentWidth: number, parentHeight: number) => {
        if (data === null) return;

        const svg: any = select(svgRef.current);

        svgRef.current.style.width = parentWidth;
        svgRef.current.style.height = parentHeight;

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleBand() // x 축
            .domain(data.map((item: dataSourceType) => `${item.name}`))
            .range([0, height]);

        const xAxis = axisLeft(xScale);
        svg.select(".x-axis")
            .call(xAxis)
            .attr("height", "100%")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`);

        const yMax = max(data, (d: dataSourceType) => d.data);

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .call(yAxis)
            .attr("width", "100%")
            .attr("opacity", 0);

        // xScale + 전체 높이의 10% - (바 높이 / 2)
        svg.selectAll(".bar")
            .transition()
            .duration(500)
            .attr("transform", `translate(0, ${margin.bottom})`)
            .attr("y", function (d: dataSourceType) {
                return xScale(d.name) + height / 10 - 10;
            })
            .attr("width", function (d: dataSourceType) {
                return yScale(d.data);
            });

        svg.selectAll(".text")
            .transition()
            .duration(500)
            .attr("transform", `translate(0, ${margin.bottom})`)
            .attr("y", function (d: dataSourceType) {
                return xScale(d.name) + height / 10 + 6;
            });
    };

    // 초기화
    const initChart = () => {
        // 막대 차트
        // const svg:Selection<any, unknown, null, undefined> = select(
        const svg: any = select(svgRef.current);

        const width =
            svgParentBoxRef.current.offsetWidth - margin.left - margin.right;
        const height =
            svgParentBoxRef.current.offsetHeight - margin.top - margin.bottom;

        const xScale = scaleBand() // x 축
            .domain(data.map((item: dataSourceType) => `${item.name}`))
            .range([0, height]);
        // (selection: Selection<BaseType, unknown, null, undefined>, ...args: any[]) => void
        // SVGGElement
        const xAxis = axisLeft(xScale);
        // console.log("xAxis: ", xAxis);
        // console.log("xAxis: ", typeof xAxis);
        // axisLeft 의 리턴 타입과 .call() 의 props 타입의 불일치?
        // svg 의 타입을 any로 하면 에러 없음
        // svg 의 기본타입을 사용하면 에러 발생
        svg.select(".x-axis")
            .call(xAxis)
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`);

        const yMax = max(data, (d: dataSourceType) => d.data);

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .call(yAxis)
            .attr("width", "100%")
            .attr("transform", `translate(${margin.left}, 0)`)
            .attr("opacity", 0);

        const bar = svg
            .selectAll(".item")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "item");

        // 바 생성
        bar.append("rect")
            .attr("class", "bar")
            .attr("height", 20) // 너비는 20로
            .attr("x", margin.left)
            .attr("transform", `translate(0, ${margin.bottom})`)
            .attr("y", function (d: dataSourceType) {
                return xScale(d.name) + height / 10 - 10;
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

        const yMax = max(data, (d: dataSourceType) => d.data) || 0;

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
            .attr("width", function (d: dataSourceType) {
                return yScale(d.data);
            });

        // 텍스트 갱신
        svg.selectAll(".text")
            .data(data)
            .transition()
            .duration(500)
            .text((d: dataSourceType) => d.data);
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

    return (
        <BarChartBox ref={svgParentBoxRef}>
            <Chart svgRef={svgRef} />
        </BarChartBox>
    );
};
const BarChartBox = styled.div`
    width: 100%;
    height: 100%;

    min-width: 250px;
    min-height: 300px;

    position: relative;
`;

export default BarChart;
