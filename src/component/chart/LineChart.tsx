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

/*
라인차트 데이터 바인딩 관련

1건씩 조회되고있음

데이터의 마지막에 추가하는 방식으로 업데이트

구간에 해당하는 시간별 데이터가 아닌 해당 구간의 가장 마지막 데이터만 바인딩 하는중

실시간의 경우
실제론 특정 구간의 데이터가 조회 되고, 이후 최신 데이터가 1건씩 추가될 것.

현재는 특정 구간의 마지막 데이터를 조회하고 이후 최신 데이터가 1건씩 추가되고 있음.

특정 구간의 경우
실제론 특정 구간의 데이터가 조회, 차트 구성후 종료

현재는 특정구간의 마지막 데이터 한건만 조회되고있기 때문에 이전 데이터에 연결되어 나타난다.
*/
const LineChart = ({ dataSource, startDate, endDate, dif, callCycle }: any) => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    const draw2 = (parentWidth: any, parentHeight: any) => {
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleTime()
            .domain([startDate, endDate])
            .range([0, width]);

        const yMax: any = max(data, (d: any) => d.data || 0) || 0;

        const yScale = scaleLinear().domain([0, yMax]).range([height, 0]);

        const myLine: any = line()
            .x((d, i: any) => {
                // 값 위치 지정

                /*
                위치는 계속 변한다.
                조회 범위에 따라 변동된다.
                
                [1,2,3,4,5]

                0번 인덱스부터그린다.
                뒤에서부터 그리기 시작한다.

                xScale(startDate): 시작 위치 (영역의 가장 좌측: 0)
                xScale(endDate): 종료 위치 (영역의 가장 우측: offsetWidth)

                dif: 조회 범위의 시간초 단위 (10분: 600)
                callCycle: 조회 주기

                600 범위를 5초 단위로 조회: 120 칸



                
                
                특정 구간 조회 <-> 실시간 조회 가 변경되는 경우 이전 데이터를 지워야 한다.
                */

                const xPos =
                    xScale(endDate) -
                    ((xScale(startDate) + data.length - i) * width) /
                        (dif / callCycle);

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

        // data.push
        // 조건: 새로운 데이터가 들어온 경우?
        const xScale: any = scaleTime()
            .domain([startDate, endDate])
            .range([0, width]);

        const yMax: any = max(data, (d: any) => d.data || 0) || 0;

        const yScale = scaleLinear().domain([0, yMax]).range([height, 0]);

        // 뒤에서부터 그려야 한다.
        const myLine: any = line()
            .x(function (d, i: any) {
                const xPos =
                    xScale(endDate) -
                    ((xScale(startDate) + data.length - i) * width) /
                        (dif / callCycle);

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

        svg.select(".y-axis")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(axisLeft(yScale));

        svg.select(".line")
            .attr("d", myLine)
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`);

        // data.shift()
        // 조건: 길이
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

    useEffect(() => {
        const { width, height } = size;

        // 차트 생성
        draw2(width, height);
    }, [size]);

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
