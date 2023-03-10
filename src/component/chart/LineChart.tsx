import { select } from "d3";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
    createLineXScale,
    createLineYScale,
    drawLine,
    drawLineXAxis,
    drawyLineAxis,
    initLine,
} from "../../common/chart";
import useResize from "../../hook/useResize";
import { ChartPropsType } from "../../types/chart";

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

    const data: any = useRef([]);
    const series: any = useRef([]);

    const renderChart = (parentWidth: any, parentHeight: any, type: string) => {
        const { startDate, endDate, dif, callCycle } = apiInfo;
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = createLineXScale(startDate, endDate, width);
        drawLineXAxis(margin, svg, height, xScale);

        const yScale = createLineYScale(data.current, height);
        drawyLineAxis(svg, yScale);

        if (type === "INIT") {
            initLine(svg, data.current, series.current);
        } else if (type === "DRAW") {
            drawLine(
                svg,
                xScale,
                yScale,
                width,
                startDate,
                endDate,
                data.current,
                dif,
                callCycle
            );
        }
    };

    useEffect(() => {
        if (dataSource.length === 0) return;

        const names = dataSource.map((item: any) => item.name);
        if (JSON.stringify(series.current) !== JSON.stringify(names)) {
            series.current = names;
            data.current = [];

            dataSource.forEach((item: any) => {
                const targetIndex = series.current.findIndex(
                    (seriesItem: any) => seriesItem === item.name
                );

                if (!data.current[targetIndex]) {
                    data.current[targetIndex] = [];
                }
                if (item.data !== null) {
                    data.current[targetIndex].push(item);
                }
            });

            const {
                current: { offsetWidth, offsetHeight },
            } = svgParentBoxRef;

            renderChart(offsetWidth, offsetHeight, "INIT");
        } else {
            dataSource.forEach((item: any) => {
                const targetIndex = series.current.findIndex(
                    (seriesItem: string) => seriesItem === item.name
                );

                if (!data.current[targetIndex]) {
                    data.current[targetIndex] = [];
                }
                if (item.data !== null) {
                    data.current[targetIndex].push(item);
                }
            });
        }
    }, [dataSource]);

    useEffect(() => {
        const { dif, callCycle } = apiInfo;
        if (dif === 0 || callCycle === 0) return;

        data.current.forEach((dataItem: any) => {
            while (dataItem.length >= dif / callCycle) {
                dataItem.shift();
            }
        });
    }, [dataSource, apiInfo]);

    // 데이터 바인딩
    useEffect(() => {
        const { width, height } = size;

        svgRef.current.style.width = width;
        svgRef.current.style.height = height;

        renderChart(width, height, "DRAW");
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

    .lineChart {
        fill: none;
        stroke-width: 1px;
        transform: translate(${margin.left}px, ${margin.bottom}px);
    }
`;

export default LineChart;
