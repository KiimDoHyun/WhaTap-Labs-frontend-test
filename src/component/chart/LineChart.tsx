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
import { dataSourceType } from "../../types/chart";
import ChartSvg from "./ChartSvg";

const margin = { top: 20, right: 20, bottom: 20, left: 40 };

interface LineChartPropsType {
    dataSource: dataSourceType[];
    apiInfo: {
        startDate: any;
        endDate: any;
        dif: number;
        callCycle: number;
    };
}

const LineChart = ({ dataSource, apiInfo }: LineChartPropsType) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    const data: any = useRef<dataSourceType[]>([]);
    const series: any = useRef<string[]>([]);

    const renderChart = (
        parentWidth: number,
        parentHeight: number,
        type: string
    ) => {
        const { startDate, endDate, dif, callCycle } = apiInfo;
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = createLineXScale(startDate, endDate, width);
        drawLineXAxis(svg, margin, height, xScale);

        const yScale = createLineYScale(data.current, height);
        drawyLineAxis(svg, yScale, margin);

        if (type === "INIT") {
            initLine(svg, data.current, series.current, margin);
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
        if (dataSource.length < 1) return;

        const names = dataSource.map((item: dataSourceType) => item.name);
        if (JSON.stringify(series.current) !== JSON.stringify(names)) {
            // if series !== name
            // init series / data
            series.current = names;
            data.current = [];

            // push data
            dataSource.forEach((item: dataSourceType) => {
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

            // init chart
            const {
                current: { offsetWidth, offsetHeight },
            } = svgParentBoxRef;

            renderChart(offsetWidth, offsetHeight, "INIT");
        } else {
            // if series === name
            // push data
            dataSource.forEach((item) => {
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

        data.current.forEach(<T extends {}>(dataItem: Array<T>) => {
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
            <ChartSvg svgRef={svgRef} />
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
