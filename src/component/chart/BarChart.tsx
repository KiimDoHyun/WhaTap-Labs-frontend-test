import { select } from "d3";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
    calcNewSize,
    createBarXScale,
    createBarYScale,
    drawBarXAxis,
    drawBaryAxis,
} from "../../common/chart";
import useResize from "../../hook/useResize";
import { ChartPropsType, dataSourceType } from "../../types/chart";

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

const BarChart = ({ dataSource, apiInfo }: any) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    // Chart Render
    const renderChart = (width: number, height: number, type: string) => {
        const svg: any = select(svgRef.current);

        // name : left
        const xScale = createBarXScale(data, height);
        drawBarXAxis(svg, xScale);

        // value : top
        const yScale = createBarYScale(data, width);
        drawBaryAxis(svg, yScale);

        if (type === "INIT") {
            console.log("INIT", data);
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
        } else if (type === "DRAW") {
            svg.selectAll(".bar")
                .data(data)
                .transition()
                .duration(500)
                .attr("y", function (d: dataSourceType) {
                    const y = xScale(d.name) + height / data.length / 2 - 10;

                    return y > 0 ? y : 0;
                })
                .attr("width", function (d: dataSourceType) {
                    return yScale(d.data) && yScale(d.data) > 0
                        ? yScale(d.data)
                        : 0;
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
        }
    };

    const prevDataSourceLength = useRef(0);
    useEffect(() => {
        if (dataSource.length === prevDataSourceLength.current) return;

        data = [...dataSource];

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
        data = [...dataSource];

        svgRef.current.style.width = width;
        svgRef.current.style.height = height;

        const [newWidth, newHeight] = calcNewSize(margin, width, height);

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
