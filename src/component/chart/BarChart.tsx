import { select } from "d3";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
    calcNewSize,
    createBarXScale,
    createBarYScale,
    drawBarChart,
    drawBarXAxis,
    drawBaryAxis,
    initBarChart,
} from "../../common/chart";
import useResize from "../../hook/useResize";
import { dataSourceType } from "../../types/chart";
import ChartSvg from "./ChartSvg";

const margin = { top: 20, right: 20, bottom: 20, left: 70 };

interface BarChartPropsType {
    dataSource: dataSourceType[];
    apiInfo: {
        startDate: any;
        endDate: any;
        dif: number;
        callCycle: number;
    };
}

const BarChart = ({ dataSource, apiInfo }: BarChartPropsType) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);
    const data: any = useRef([]);

    // Chart Render
    const renderChart = (width: number, height: number, type: string) => {
        const svg: any = select(svgRef.current);

        // name : left
        const xScale = createBarXScale(data.current, height);
        drawBarXAxis(svg, xScale, margin);

        // value : top
        const yScale = createBarYScale(data.current, width);
        drawBaryAxis(svg, yScale, margin);

        if (type === "INIT") {
            initBarChart(svg, data.current, margin, xScale, height);
        } else if (type === "DRAW") {
            drawBarChart(svg, data.current, height, xScale, yScale);
        }
    };

    const prevDataSourceLength = useRef(0);
    useEffect(() => {
        if (dataSource.length === prevDataSourceLength.current) return;

        data.current = [...dataSource];

        const {
            current: { offsetWidth, offsetHeight },
        } = svgParentBoxRef;

        const [newWidth, newHeight] = calcNewSize(
            margin,
            offsetWidth,
            offsetHeight
        );

        renderChart(newWidth, newHeight, "INIT");
        prevDataSourceLength.current = dataSource.length;
    }, [dataSource]);

    useEffect(() => {
        const { width, height } = size;
        data.current = [...dataSource];

        svgRef.current.style.width = width;
        svgRef.current.style.height = height;

        const [newWidth, newHeight] = calcNewSize(margin, width, height);

        renderChart(newWidth, newHeight, "DRAW");
    }, [size, dataSource]);

    return (
        <BarChartBox ref={svgParentBoxRef}>
            <ChartSvg svgRef={svgRef} />
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
