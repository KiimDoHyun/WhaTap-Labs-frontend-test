import { axisBottom, axisLeft, line, scaleLinear, scaleTime, select } from "d3";
import { useEffect, useRef } from "react";
import { queue } from "..";
import api from "../api";

const now: any = new Date(Date.now());
const data = new Array(600).fill(0);

/*
Todo: 데이터 매칭을 어떻게 할지
*/

const margin = { top: 20, right: 20, bottom: 20, left: 40 };

const TestChart2 = () => {
    const svgRef = useRef(null);

    const draw2 = () => {
        const svg: any = select(svgRef.current);

        var width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        const xScale = scaleTime()
            .domain([now - 1000 * 60 * 10, now]) // 현재로부터 10분 전 까지를 범위로 지정한다.
            .range([0, width]);

        const yScale = scaleLinear().domain([0, 5000]).range([height, 0]);

        const myLine: any = line()
            .x((d, i: any) => {
                // 값 위치 지정

                // 실제 보여지는 범위는 range에 의해 축소되어있음.
                // 1. 단순히 0 ~ 600 px 로 변환
                // 2. 해당 비율을 반영해서 좌표를 지정
                const xPos = ((xScale(now - 1000 * 60 * 10) + i) * width) / 600;

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

        svg.append("path")
            .datum(data)
            .attr("class", "line") // (CSS)
            .attr("fill", "none")
            .attr("x", "40")
            .attr("stroke", "blue")
            .attr("stroke-width", "1px")
            .attr("d", myLine)
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`);
    };

    const update = (newData = 100) => {
        //xXcale.domain 을 수정한다. 뒤에 하나추가, 앞에서 하나 제거
        /*
        x axis 를 선택해서 transtion 적용
        */
        const svg: any = select(svgRef.current);

        var width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        const xScale: any = scaleTime()
            .domain([now - 1000 * 60 * 10, now])
            .range([0, width]);

        const yScale = scaleLinear().domain([0, 5000]).range([height, 0]);

        const myLine: any = line()
            .x(function (d, i: any) {
                const xPos = ((xScale(now - 1000 * 60 * 10) + i) * width) / 600;

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

        // 데이터 제거
        // if (data.length === 600) {
        // }
        data.shift();
    };

    useEffect(() => {
        // 차트 생성
        draw2();

        // 데이터 조회
        setInterval(() => {
            const start = Date.now() - 1000 * 60 * 10;
            const end = Date.now();
            queue.push({
                callApi: () =>
                    api.series("transaction/{stime}/{etime}", {
                        stime: start,
                        etime: end,
                    }),
                success: (data: any) => {
                    const filterTarget = data.records.find((item: any) =>
                        item.service.includes("/product/write/dept/pusan")
                    );
                    update(filterTarget ? filterTarget.time_min : 0);
                },
                fail: () => console.log("에러"),
            });
        }, 5000);
    }, []);

    return (
        <div>
            <div>
                Time <div className="infoIcon"></div>
            </div>
            <div style={{ height: "500px", width: "500px" }}>
                <svg
                    width={500}
                    height={500}
                    ref={svgRef}
                    style={{ height: "500px", width: "500px" }}
                >
                    <g className="y-axis" />
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    );
};

export default TestChart2;
