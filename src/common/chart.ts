// Common
//

import {
    axisBottom,
    axisLeft,
    axisTop,
    line,
    max,
    ScaleBand,
    scaleBand,
    ScaleLinear,
    scaleLinear,
    scaleOrdinal,
    ScaleTime,
    scaleTime,
    schemeCategory10,
} from "d3";
import { dataSourceType } from "../types/chart";

interface MarginType {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

// svg width/height 계산
export const calcNewSize = (
    margin: MarginType,
    width: number,
    height: number
) => {
    const newWidth = width - margin.left - margin.right;
    const newHeight = height - margin.top - margin.bottom;

    return [newWidth, newHeight];
};

export const getMax = (data: dataSourceType[]) =>
    max(data, (d: dataSourceType) => d.data);

//
// Bar Chart
//

export const createBarXScale = (data: dataSourceType[], height: number) => {
    return scaleBand() // x 축
        .domain(data.map((item: dataSourceType) => `${item.name}`))
        .range([0, height]);
};

export const createBarYScale = (data: dataSourceType[], width: number) => {
    return scaleLinear()
        .domain([0, Number(getMax(data))])
        .range([0, width]);
};

// xAxis 생성
export const drawBarXAxis = (svg: any, xScale: ScaleBand<string>) => {
    svg.select(".x-axis").call(axisLeft(xScale));
};

// yAxis 생성
export const drawBaryAxis = (
    svg: any,
    yScale: ScaleLinear<number, number, never>
) => {
    svg.select(".y-axis").call(axisTop(yScale));
};

//
// Line Chart
//

export const createLineYScale = (data: any, height: number) => {
    const maxResult = data.map((item: any) => {
        if (JSON.stringify(item) === "[]") return 0;

        return getMax(item);
    });

    return scaleLinear()
        .domain([0, max(maxResult, (d: number) => d) || 0])
        .range([height, 0]);
};

export const createLineXScale = (
    startDate: Date,
    endDate: Date,
    width: number
) => {
    return scaleTime().domain([startDate, endDate]).range([0, width]);
};

export const drawLineXAxis = (
    margin: MarginType,
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

export const drawyLineAxis = (
    svg: any,
    yScale: ScaleLinear<number, number, never>
) => {
    svg.select(".y-axis").call(axisLeft(yScale).ticks(5));
};

export const initLine = (svg: any, data: any, series: string[]) => {
    const colors = scaleOrdinal(schemeCategory10);
    svg.selectAll(".lineWrapper").remove();
    const lineG = svg
        .append("g")
        .attr("class", "lineWrapper")
        .selectAll("g")
        .data(data)
        .enter();

    lineG
        .append("path")
        .attr("class", "lineChart")
        .attr("fill", "none")
        .style("stroke", function (d: any, i: any) {
            return colors(series[i]);
        });
};

export const createLine = (
    xScale: any,
    yScale: any,
    startDate: any,
    endDate: any,
    data: any,
    width: any,
    dif: number,
    callCycle: number
) => {
    return line()
        .x((d, i: any) => {
            const xPos =
                xScale(endDate) -
                ((xScale(startDate) + data[0].length - i) * width) /
                    (dif / callCycle);

            return xPos;
        })
        .y((d: any) => yScale(d.data || 0));
};

export const drawLine = (
    svg: any,
    xScale: ScaleTime<number, number, never>,
    yScale: ScaleLinear<number, number, never>,
    width: number,
    startDate: Date,
    endDate: Date,
    data: any,
    dif: number,
    callCycle: number
) => {
    const myLine: any = line()
        .x((d, i: any) => {
            const xPos =
                xScale(endDate) -
                ((xScale(startDate) + data[0].length - i) * width) /
                    (dif / callCycle);

            return xPos;
        })
        .y((d: any) => yScale(d.data || 0));

    svg.selectAll(".lineWrapper").data(data).enter();
    svg.selectAll(".lineChart").attr("d", myLine);
};
