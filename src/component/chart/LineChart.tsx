import { select } from "d3";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
    createLineXScale,
    createLineYScale,
    drawLine,
    drawLineXAxis,
    drawyLineAxis,
} from "../../common/chart";
import useResize from "../../hook/useResize";
import { ChartPropsType } from "../../types/chart";

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

const LineChart = ({ dataSource, apiInfo }: any) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    const renderChart = (parentWidth: any, parentHeight: any) => {
        const { startDate, endDate, dif, callCycle } = apiInfo;
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = createLineXScale(startDate, endDate, width);
        drawLineXAxis(margin, svg, height, xScale);

        const yScale = createLineYScale(data, height);
        drawyLineAxis(svg, yScale);

        drawLine(
            svg,
            xScale,
            yScale,
            width,
            startDate,
            endDate,
            data,
            dif,
            callCycle
        );
    };

    useEffect(() => {
        data.push(dataSource[0]);
    }, [dataSource]);

    useEffect(() => {
        const { dif, callCycle } = apiInfo;
        if (dif === 0 || callCycle === 0) return;

        while (data.length >= dif / callCycle) {
            data.shift();
        }
    }, [dataSource, apiInfo]);

    // 데이터 바인딩
    useEffect(() => {
        const { width, height } = size;

        svgRef.current.style.width = width;
        svgRef.current.style.height = height;

        renderChart(width, height);
    }, [apiInfo, size]);

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
