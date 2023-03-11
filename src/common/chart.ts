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
export const drawBarXAxis = (
    svg: any,
    xScale: ScaleBand<string>,
    margin: MarginType
) => {
    svg.select(".x-axis")
        .attr("height", "100%")
        .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
        .call(axisLeft(xScale));
};

// yAxis 생성
export const drawBaryAxis = (
    svg: any,
    yScale: ScaleLinear<number, number, never>,
    margin: MarginType
) => {
    svg.select(".y-axis")
        .attr("width", "100%")
        .attr("transform", `translate(${margin.left}, 0)`)
        .attr("opacity", "0")
        .call(axisTop(yScale));
};

export const initBarChart = (
    svg: any,
    data: any,
    margin: MarginType,
    xScale: any,
    height: any
) => {
    svg.selectAll(".item").remove();
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
            const y = xScale(d.name) + height / data.length / 2 - 10;
            return y > 0 ? y : 0;
        });

    // 텍스트가 들어갈 요소 생성
    bar.append("text")
        .attr("class", "text")
        .attr("x", margin.left + 10)
        .attr("fill", "#919191")
        .attr("transform", `translate(0, ${margin.bottom})`)
        .attr("y", function (d: dataSourceType) {
            const y = xScale(d.name) + height / data.length / 2 + 6;
            return y > 0 ? y : 0;
        });
};
export const drawBarChart = (
    svg: any,
    data: any,
    height: any,
    xScale: any,
    yScale: any
) => {
    svg.selectAll(".bar")
        .data(data)
        .transition()
        .duration(500)
        .attr("y", function (d: dataSourceType) {
            const y = xScale(d.name) + height / data.length / 2 - 10;

            return y > 0 ? y : 0;
        })
        .attr("width", function (d: dataSourceType) {
            return yScale(d.data) && yScale(d.data) > 0 ? yScale(d.data) : 0;
        });

    svg.selectAll(".text")
        .data(data)
        .transition()
        .duration(500)
        .attr("y", function (d: dataSourceType) {
            const y = xScale(d.name) + height / data.length / 2 + 6;
            return y > 0 ? y : 0;
        })
        .text((d: dataSourceType) => d.data);
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
    yScale: ScaleLinear<number, number, never>,
    margin: MarginType
) => {
    svg.select(".y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
        .call(axisLeft(yScale).ticks(5));
};

export const initLine = (
    svg: any,
    data: any,
    series: string[],
    margin: any
) => {
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
        .attr("stroke-width", "1px")
        .style("transform", `translate(${margin.left}px, ${margin.bottom}px)`)
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
