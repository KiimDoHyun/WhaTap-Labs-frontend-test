import {
    axisBottom,
    axisLeft,
    line,
    max,
    scaleLinear,
    scaleTime,
    select,
} from "d3";
import React, { useEffect, useRef } from "react";
import { queue } from "../..";
import api from "../../api";
import styled from "styled-components";
import useResize from "../../hook/useResize";
import { ChartPropsType, LineChartPropsType } from "../../types/chart";

/*
d3는 DOM을 직접 조작한다.
차트를 그리는데 사용할 데이터가 외부에 일반 변수로존재한다.

Todo: 미리 600개의 데이터를 조회하는 부분 수정
Todo: 조회 api 수정 -> spot 타입 데이터 조회로 변경
*/
// const data = new Array(600).fill(0);

const data: any = [];

const margin = { top: 20, right: 20, bottom: 20, left: 40 };

const Chart = React.memo(({ svgRef }: ChartPropsType) => {
    console.log("차트 리렌더링");
    return (
        <svg ref={svgRef}>
            <g className="y-axis" />
            <g className="x-axis" />
            <path className="line" />
        </svg>
    );
});

const LineChart = ({ dataSource, startDate, endDate, dif, callCycle }: any) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    const draw2 = (parentWidth: any, parentHeight: any) => {
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleTime()
            .domain([startDate, endDate]) // 현재로부터 10분 전 까지를 범위로 지정한다.
            .range([0, width]);

        const yMax: any = max(data, (d: any) => d.data || 0) || 0;

        const yScale = scaleLinear().domain([0, yMax]).range([height, 0]);

        const myLine: any = line()
            .x((d, i: any) => {
                // 값 위치 지정
                const xPos =
                    xScale(endDate) - (data.length - 1 - i) * callCycle;

                return xPos;
            })
            .y((d: any) => yScale(d.data || 0));

        svg.select(".x-axis")
            .attr(
                "transform",
                `translate(${margin.left}, ${height + margin.bottom})`
            )
            .call(axisBottom(xScale));

        svg.select(".y-axis")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(axisLeft(yScale));

        svg.select(".line")
            .datum(data)
            .attr("fill", "none")
            .attr("x", "40")
            .attr("stroke", "blue")
            .attr("stroke-width", "1px")
            .attr("d", myLine)
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`);
    };

    // 업데이트하면 이전 차트위에 새로 그린 라인이 추가됨.
    const update = () => {
        const svg: any = select(svgRef.current);

        const parentWidth = svgParentBoxRef.current.offsetWidth;
        const parentHeight = svgParentBoxRef.current.offsetHeight;

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale: any = scaleTime()
            .domain([startDate, endDate])
            .range([0, width]);

        const yMax: any = max(data, (d: any) => d.data || 0) || 0;

        const yScale = scaleLinear().domain([0, yMax]).range([height, 0]);

        // 뒤에서부터 그려야 한다.
        const myLine: any = line()
            .x(function (d, i: any) {
                const xPos =
                    xScale(endDate) - (data.length - 1 - i) * callCycle;

                return xPos;
            })
            .y((d: any) => yScale(d.data || 0));

        // 데이터 추가
        svg.select(".x-axis")
            .transition()
            .attr(
                "transform",
                `translate(${margin.left}, ${height + margin.bottom})`
            )
            .call(axisBottom(xScale));

        svg.select(".line")
            .attr("d", myLine)
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`);
    };

    useEffect(() => {
        const { width, height } = size;

        // 차트 생성
        draw2(width, height);
    }, [size]);

    useEffect(() => {
        data.push(dataSource[0]);

        if (data.length > dif / callCycle) {
            data.shift();
        }
    }, [dataSource]);

    useEffect(() => {
        update();
    }, [startDate, endDate, dif, callCycle]);

    return (
        <LineChartBox>
            <div className="title">
                Time <div className="infoIcon"></div>
            </div>
            <div className="chart" ref={svgParentBoxRef}>
                <Chart svgRef={svgRef} />
            </div>
        </LineChartBox>
    );
};

const LineChartBox = styled.div`
    width: 100%;
    height: 100%;

    .title {
        height: 20px;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .chart {
        height: calc(100% - 30px);

        svg {
            width: 100%;
            height: 100%;
        }
    }
`;

export default LineChart;
