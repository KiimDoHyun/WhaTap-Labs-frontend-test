import { axisLeft, axisTop, max, scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef, useState } from "react";
import { queue } from "..";
import api from "../api";
import styled from "styled-components";
import useResize from "../hook/useResize";

const margin = { top: 20, right: 20, bottom: 20, left: 70 };

const TestChart1 = () => {
    const svgRef = useRef(null);
    const svgParentBoxRef = useRef(null);
    const size = useResize(svgParentBoxRef);

    const [data, setData] = useState([
        {
            name: "act_method",
            value: 0,
        },
        {
            name: "act_sql",
            value: 0,
        },
        {
            name: "act_httpc",
            value: 0,
        },
        {
            name: "act_dbc",
            value: 0,
        },
        {
            name: "act_socket",
            value: 0,
        },
    ]);

    // resize
    const responseiveDraw = (parentWidth: any, parentHeight: any) => {
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleBand() // x 축
            .domain(data.map((item) => `${item.name}`))
            .range([0, height]);

        const xAxis = axisLeft(xScale).ticks(4);
        svg.select(".x-axis")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(xAxis);

        const yMax = max(data, function (d: any) {
            return d.value;
        });

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .attr("width", "100%")
            .attr("opacity", 0)
            .call(yAxis);

        svg.selectAll(".bar")
            .transition()
            .duration(500)
            .attr("y", function (d: any) {
                return xScale(d.name) + margin.top + margin.bottom;
            })
            .attr("width", function (d: any) {
                return d.value ? yScale(d.value) + margin.left : 0;
            });

        svg.selectAll(".text")
            .transition()
            .duration(500)
            .attr("y", function (d: any, i: any) {
                return xScale(d.name) + margin.top + margin.bottom + 17;
            });
    };

    // 초기화
    const drawChart = (parentWidth: any, parentHeight: any) => {
        // 막대 차트
        const svg: any = select(svgRef.current);

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleBand() // x 축
            .domain(data.map((item) => `${item.name}`))
            .range([0, height]);

        const xAxis = axisLeft(xScale).ticks(4);
        svg.select(".x-axis")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(xAxis);

        const yScale = scaleLinear().domain([0, 10]).range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .attr("width", "100%")
            // .attr("transform", "translate(0, 20)")
            .attr("opacity", 0)
            .call(yAxis);

        // 텍스트 추가해보기

        let bar = svg
            .selectAll(".item")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "item");

        bar.append("rect")
            .attr("class", "bar")
            // 첫번째 인자에 배열의 요소가, 두번째 인자에 인덱스가 들어있음.
            .attr("width", 0)
            .attr("height", 25) // 너비는 25로
            .attr("y", function (d: any, i: any) {
                return xScale(d.name) + margin.top + margin.bottom;
            }) // x 위치는 해당 값의 x축의 위치로
            .attr("x", function (d: any, i: any) {
                return 70;
            }); // y 는 원래 높이에서 해당 높이를 뺀 만큼

        bar.append("text")
            .attr("class", "text")
            .text(function (d: any) {
                return d.value;
            })
            .attr("fill", "#919191")
            .attr("x", 80)
            .attr("y", function (d: any, i: any) {
                return xScale(d.name) + margin.top + margin.bottom;
            });
    };

    // 데이터 바인딩
    const updateChart = (newData: any) => {
        const svg: any = select(svgRef.current);

        const parentWidth = svgParentBoxRef.current.offsetWidth;
        const parentHeight = svgParentBoxRef.current.offsetHeight;

        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;

        const xScale = scaleBand() // x 축
            .domain(newData.map((item: any) => String(item.name)))
            .range([0, height]);

        const yMax = max(newData, function (d: any) {
            return d.value;
        });

        const yScale = scaleLinear()
            .domain([0, Number(yMax)])
            .range([0, width]);

        const yAxis = axisTop(yScale);
        svg.select(".y-axis")
            .attr("width", "100%")
            .attr("opacity", 0)
            .call(yAxis);

        svg.selectAll(".bar")
            .data(newData)
            // css: trasition: 500 과 동일함
            .transition()
            .duration(500)
            // 모든 데이터가 변경되는 경우 딜레이를 추가할 수 있음.
            // .delay((d: any, i: any) => i * 100)
            .attr("class", "bar")
            // 첫번째 인자에 배열의 요소가, 두번째 인자에 인덱스가 들어있음.
            .attr("width", function (d: any) {
                return d.value ? yScale(d.value) + margin.left : 0;
                // return d.value;
            }) // 높이는 각 값의 *5 만큼 크기로
            .attr("y", function (d: any, i: any) {
                // return xScale(d.name);
                return xScale(d.name) + margin.top + margin.bottom;
            }); // x 위치는 해당 값의 x축의 위치로

        svg.selectAll(".text")
            .data(newData)
            .transition()
            .duration(500)
            .attr("class", "text")
            .text(function (d: any) {
                return d.value;
            });
    };

    // 조회 에러 발생: 갱신 X
    // api 호출 생성 함수
    const apiObj = (type: string) => {
        return {
            callApi: () => api.spot(type),
            success: (newValue: any) =>
                setData((prevState) => {
                    const newData = prevState.map((item) =>
                        item.name === type ? { ...item, value: newValue } : item
                    );
                    updateChart(newData);

                    return newData;
                }),
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };

    // 필요데이터 조회: act (액티브 스테이터스)
    // 최대값 기준
    useEffect(() => {
        setInterval(() => {
            queue.push(apiObj("act_method"));
        }, 5000);
        setInterval(() => {
            queue.push(apiObj("act_sql"));
        }, 5000);
        setInterval(() => {
            queue.push(apiObj("act_httpc"));
        }, 5000);
        setInterval(() => {
            queue.push(apiObj("act_dbc"));
        }, 5000);
        setInterval(() => {
            queue.push(apiObj("act_socket"));
        }, 5000);

        drawChart(0, 0);
    }, []);

    useEffect(() => {
        const { width, height } = size;

        // 차트 다시 그리기
        responseiveDraw(width, height);
    }, [size]);

    return (
        <TestChart1Box>
            <div className="title">
                액티브 스테이터스 <div className="infoIcon"></div>
            </div>
            <div className="chart" ref={svgParentBoxRef}>
                <svg ref={svgRef}>
                    <g className="y-axis" />
                    <g className="x-axis" />
                </svg>
            </div>
        </TestChart1Box>
    );
};
const TestChart1Box = styled.div`
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

export default TestChart1;
