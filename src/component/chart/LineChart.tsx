import {
    axisBottom,
    axisLeft,
    line,
    max,
    ScaleLinear,
    scaleLinear,
    ScaleTime,
    scaleTime,
    select,
} from "d3";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useResize from "../../hook/useResize";
import { ChartPropsType, dataSourceType } from "../../types/chart";

const data: any = [];

const margin = { top: 20, right: 20, bottom: 20, left: 40 };

const yAxis = {
    transform: `translate(${margin.left}, ${margin.bottom})`,
};

const lineStyle = {
    fill: "none",
    stroke: "blue",
    strokeWidth: "1px",
    transform: `translate(${margin.left}, ${margin.bottom})`,
};

const Chart = React.memo(({ svgRef }: ChartPropsType) => {
    console.log("차트 리렌더링");
    return (
        <svg ref={svgRef}>
            <g className="y-axis" {...yAxis} />
            <g className="x-axis" />
            <path className="line" {...lineStyle} />
        </svg>
    );
});

const LineChart = ({ dataSource, startDate, endDate, dif, callCycle }: any) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    const getMax = () => max(data, (d: dataSourceType) => d.data);

    const createYScale = (height: number) => {
        return scaleLinear().domain([0, getMax()]).range([height, 0]);
    };
    const drawXAxis = (
        svg: any,
        height: number,
        xScale: ScaleTime<number, number, never>
    ) => {
        svg.select(".x-axis")
            .transition()
            .attr(
                "transform",
                `translate(${margin.left}, ${height + margin.bottom})`
            )
            .call(axisBottom(xScale));
    };

    const drawyAxis = (
        svg: any,
        yScale: ScaleLinear<number, number, never>
    ) => {
        svg.select(".y-axis").call(axisLeft(yScale).ticks(5));
    };

    const drawLine = (
        svg: any,
        xScale: ScaleTime<number, number, never>,
        yScale: ScaleLinear<number, number, never>,
        width: number
    ) => {
        const myLine: any = line()
            .x((d, i: any) => {
                const xPos =
                    xScale(endDate) -
                    ((xScale(startDate) + data.length - i) * width) /
                        (dif / callCycle);

                return xPos;
            })
            .y((d: any) => yScale(d.data || 0));

        svg.select(".line").datum(data).attr("d", myLine);
    };

    const renderChart = (parentWidth: any, parentHeight: any) => {
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleTime()
            .domain([startDate, endDate])
            .range([0, width]);
        drawXAxis(svg, height, xScale);

        const yScale = createYScale(height);
        drawyAxis(svg, yScale);

        drawLine(svg, xScale, yScale, width);
    };

    useEffect(() => {
        data.push(dataSource[0]);
    }, [dataSource]);

    useEffect(() => {
        if (dif === 0 || callCycle === 0) return;

        while (data.length >= dif / callCycle) {
            data.shift();
        }
    }, [dataSource, dif, callCycle]);

    // 데이터 바인딩
    useEffect(() => {
        const { width, height } = size;

        svgRef.current.style.width = width;
        svgRef.current.style.height = height;

        renderChart(width, height);
    }, [startDate, endDate, dif, callCycle, size]);

    return (
        <LineChartBox ref={svgParentBoxRef}>
            <Chart svgRef={svgRef} />
        </LineChartBox>
    );
};

const LineChartBox = styled.div`
    width: 100%;

    min-width: 250px;
    min-height: 300px;

    position: relative;
`;

export default LineChart;
