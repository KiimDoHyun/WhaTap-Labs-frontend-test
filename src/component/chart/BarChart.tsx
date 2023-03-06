import {
    axisLeft,
    axisTop,
    max,
    ScaleBand,
    scaleBand,
    ScaleLinear,
    scaleLinear,
    select,
} from "d3";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useResize from "../../hook/useResize";
import {
    BarChartPropsType,
    ChartPropsType,
    dataSourceType,
} from "../../types/chart";

const margin = { top: 20, right: 20, bottom: 20, left: 70 };

let data: dataSourceType[] = [];

const yAxisStyle = {
    width: "100%",
    transform: `translate(${margin.left}, 0)`,
    opacity: 0,
};

const xAxisStyle = {
    height: "100%",
    transform: `translate(${margin.left}, ${margin.bottom})`,
};

const Chart = React.memo(({ svgRef }: ChartPropsType) => {
    return (
        <svg ref={svgRef}>
            <g className="y-axis" {...yAxisStyle} />
            <g className="x-axis" {...xAxisStyle} />
        </svg>
    );
});

const BarChart = ({ dataSource }: BarChartPropsType) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    // 필요데이터 조회: act (액티브 스테이터스)
    // 최대값 기준

    // 최댓값 계산
    const getMax = () => max(data, (d: dataSourceType) => d.data);

    // xScale 생성
    const createXScale = (height: number) => {
        return scaleBand() // x 축
            .domain(data.map((item: dataSourceType) => `${item.name}`))
            .range([0, height]);
    };

    // yScale 생성
    const createYScale = (width: number) => {
        return scaleLinear()
            .domain([0, Number(getMax())])
            .range([0, width]);
    };

    // xAxis 생성
    const drawXAxis = (svg: any, xScale: ScaleBand<string>) => {
        svg.select(".x-axis").call(axisLeft(xScale));
    };

    // yAxis 생성
    const drawyAxis = (
        svg: any,
        yScale: ScaleLinear<number, number, never>
    ) => {
        svg.select(".y-axis").call(axisTop(yScale));
    };

    // svg width/height 계산
    const calcNewSize = (width: number, height: number) => {
        const newWidth = width - margin.left - margin.right;
        const newHeight = height - margin.top - margin.bottom;

        return [newWidth, newHeight];
    };

    // Chart Render
    const renderChart = (width: number, height: number, type: string) => {
        const svg: any = select(svgRef.current);

        // name : left
        const xScale = createXScale(height);
        drawXAxis(svg, xScale);

        // value : top
        const yScale = createYScale(width);
        drawyAxis(svg, yScale);

        if (type === "INIT") {
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
                .attr("fill", "#919191")
                .attr("transform", `translate(0, ${margin.bottom})`)
                .attr("y", function (d: dataSourceType) {
                    return xScale(d.name) + height / 10 + 6;
                });
        } else if (type === "DRAW") {
            svg.selectAll(".bar")
                .data(data)
                .transition()
                .duration(500)
                .attr("y", function (d: dataSourceType) {
                    return xScale(d.name) + height / 10 - 10;
                })
                .attr("width", function (d: dataSourceType) {
                    return yScale(d.data);
                });

            svg.selectAll(".text")
                .data(data)
                .transition()
                .duration(500)
                .attr("y", function (d: dataSourceType) {
                    return xScale(d.name) + height / 10 + 6;
                })
                .text((d: dataSourceType) => d.data);
        }
    };

    useEffect(() => {
        data = [...dataSource];

        const {
            current: { offsetWidth, offsetHeight },
        } = svgParentBoxRef;

        const [newWidth, newHeight] = calcNewSize(offsetWidth, offsetHeight);

        renderChart(newWidth, newHeight, "INIT");
    }, []);

    useEffect(() => {
        const { width, height } = size;
        data = [...dataSource];

        svgRef.current.style.width = width;
        svgRef.current.style.height = height;

        const [newWidth, newHeight] = calcNewSize(width, height);

        renderChart(newWidth, newHeight, "DRAW");
    }, [size, dataSource]);

    return (
        <BarChartBox ref={svgParentBoxRef}>
            <Chart svgRef={svgRef} />
        </BarChartBox>
    );
};
const BarChartBox = styled.div`
    width: 100%;

    min-width: 250px;
    min-height: 300px;

    position: relative;
`;

export default BarChart;
