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
    ScaleTime,
    scaleTime,
} from "d3";
import { dataSourceType } from "../types/chart";

// svg width/height 계산
export const calcNewSize = (
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    },
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

export const createLineYScale = (data: dataSourceType[], height: number) => {
    return scaleLinear()
        .domain([0, getMax(data)])
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
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    },
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

export const drawLine = (
    svg: any,
    xScale: ScaleTime<number, number, never>,
    yScale: ScaleLinear<number, number, never>,
    width: number,
    startDate: Date,
    endDate: Date,
    data: dataSourceType[],
    dif: number,
    callCycle: number
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
