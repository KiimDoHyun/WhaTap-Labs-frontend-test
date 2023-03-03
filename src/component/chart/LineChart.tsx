import { axisBottom, axisLeft, line, scaleLinear, scaleTime, select } from "d3";
import { useEffect, useRef } from "react";
import { queue } from "../..";
import api from "../../api";
import styled from "styled-components";
import useResize from "../../hook/useResize";
import { LineChartPropsType } from "../../types/chart";

const now: any = new Date(Date.now());

console.log("now: ", now);
console.log("now: ", typeof now);
/*
d3는 DOM을 직접 조작한다.
차트를 그리는데 사용할 데이터가 외부에 일반 변수로존재한다.

Todo: 미리 600개의 데이터를 조회하는 부분 수정
Todo: 조회 api 수정 -> spot 타입 데이터 조회로 변경
*/
const data = new Array(600).fill(0);

const margin = { top: 20, right: 20, bottom: 20, left: 40 };

const LineChart = ({ dataSource, startDate, endDate }: LineChartPropsType) => {
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

        const yScale = scaleLinear().domain([0, 5000]).range([height, 0]);

        const myLine: any = line()
            .x((d, i: any) => {
                // 값 위치 지정

                // 실제 보여지는 범위는 range에 의해 축소되어있음.
                // 1. 단순히 0 ~ 600 px 로 변환
                // 2. 해당 비율을 반영해서 좌표를 지정
                const xPos = ((xScale(startDate) + i) * width) / 600;

                return xPos;
            })
            .y((d: any) => yScale(d));

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
    const update = (newData = 100) => {
        const svg: any = select(svgRef.current);

        const parentWidth = svgParentBoxRef.current.offsetWidth;
        const parentHeight = svgParentBoxRef.current.offsetHeight;

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const now: any = new Date(Date.now());

        const xScale: any = scaleTime()
            .domain([startDate, endDate])
            .range([0, width]);

        const yScale = scaleLinear().domain([0, 5000]).range([height, 0]);

        const myLine: any = line()
            .x(function (d, i: any) {
                const xPos = ((xScale(startDate) + i) * width) / 600;

                return xPos;
            })
            .y((d: any) => yScale(d));

        // 데이터 추가
        data.push(newData);
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

        data.shift();
    };

    useEffect(() => {
        // return;
        // 데이터 조회
        // setInterval(() => {
        //     const start = Date.now() - 1000 * 60 * 10;
        //     const end = Date.now();
        //     queue.push({
        //         callApi: () =>
        //             api.series("transaction/{stime}/{etime}", {
        //                 stime: start,
        //                 etime: end,
        //             }),
        //         success: (data: any) => {
        //             const filterTarget = data.records.find((item: any) =>
        //                 item.service.includes("/product/write/dept/pusan")
        //             );
        //             update(filterTarget ? filterTarget.time_min : 0);
        //         },
        //         fail: () => console.log("에러"),
        //     });
        // }, 5000);
    }, []);

    useEffect(() => {
        const { width, height } = size;

        // 차트 생성
        draw2(width, height);
    }, [size]);

    return (
        <LineChartBox>
            <div className="title">
                Time <div className="infoIcon"></div>
            </div>
            <div className="chart" ref={svgParentBoxRef}>
                <svg ref={svgRef}>
                    {/* <svg width={500} height={500} ref={svgRef}> */}
                    <g className="y-axis" />
                    <g className="x-axis" />
                    <path className="line" />
                </svg>
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
