import {
    active,
    axisBottom,
    axisLeft,
    curveMonotoneX,
    easeLinear,
    line,
    max,
    randomNormal,
    randomUniform,
    range,
    scaleLinear,
    scaleTime,
    select,
    timeParse,
} from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../api";

const n = 243;
const duration = 750;
const now: any = new Date(Date.now() - duration);
const count = 0;
const data = range(n).map(function () {
    return 0.5;
});

const margin = { top: 20, right: 20, bottom: 20, left: 40 };

const TestChart2 = () => {
    const svgRef = useRef(null);

    const width = useMemo(() => {
        return +svgRef.current?.attr("width") - margin.left - margin.right;
    }, [svgRef.current]);

    const height = useMemo(() => {
        return +svgRef.current?.attr("height") - margin.left - margin.right;
    }, [svgRef.current]);

    const draw1 = () => {
        const svg: any = select(svgRef.current);

        let n = 100;

        // Max값의 기준?
        // x 축 시간 범위로 변경
        // 조회 데이터엔 시간값이 없음
        // 범위 시간만 알 수 있음.
        // 시작, 종료 시간에서 5초 단위로 끊어서 데이터를 조합?

        // let xScale = scaleLinear()
        //     // .domain([
        //     //     new Date(Date.now() - 1000 * 60 * 10),
        //     //     new Date(Date.now()),
        //     // ])
        //     .domain(aa)
        //     .range([50, 450]);

        //

        // 시간축
        let xScale = scaleLinear().domain([0, n]).range([50, 450]);

        let yScale = scaleLinear().domain([0, 1]).range([450, 50]);

        let myLine = line()
            .x(function (d, i) {
                return xScale(i);
            })
            .y(function (d: any, i) {
                return yScale(d.y);
            })
            .curve(curveMonotoneX);

        let dataSet = range(n).map((d) => ({ y: randomUniform(0.3, 0.5)() }));

        svg.select(".x-axis")
            .attr("transform", "translate(0, 450)")
            .call(axisBottom(xScale));

        svg.select(".y-axis")
            .attr("transform", "translate(50, 0)")
            .call(axisLeft(yScale));

        // 선 추가
        svg.append("path")
            .datum(dataSet)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "1px")
            .attr("d", myLine);

        // 점 추가
        // svg.selectAll(".dot")
        //     .data(dataSet)
        //     .enter()
        //     .append("circle")
        //     .attr("cx", function (d: any, i: any) {
        //         return xScale(i);
        //     })
        //     .attr("cy", function (d: any, i: any) {
        //         return yScale(d.y);
        //     })
        //     .attr("r", 3);
    };

    const draw2 = () => {
        const svg: any = select(svgRef.current);

        var n = 243,
            duration = 750,
            now: any = new Date(Date.now() - duration),
            count = 0;

        console.log("data: ", data);

        var margin = { top: 20, right: 20, bottom: 20, left: 40 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;
        // g = svg
        //     .append("g")
        //     .attr(
        //         "transform",
        //         "translate(" + margin.left + "," + margin.top + ")"
        //     );

        const xScale = scaleTime()
            .domain([now - (n - 2) * duration, now - duration])
            .range([0, width]);

        var x: any = scaleTime()
            .domain([now - (n - 2) * duration, now - duration])
            .range([0, width]);

        console.log("height: ", height);
        const yScale = scaleLinear().range([height, 0]);

        var y = scaleLinear().range([height, 0]);

        var myLine: any = line()
            .x(function (d, i: any) {
                return x(now - (n - 1 - i) * duration);
            })
            .y(function (d: any, i) {
                return y(d);
            });

        // g.append("defs")
        //     .append("clipPath")
        //     .attr("id", "clip")
        //     .append("rect")
        //     .attr("width", width)
        //     .attr("height", height);

        svg.select(".x-axis")
            .attr(
                "transform",
                `translate(${margin.left}, ${height + margin.bottom})`
            )
            .call(axisBottom(xScale));

        // var axis = g
        //     .append("g")
        //     .attr("class", "x-axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call((x.axis = axisBottom(x)));

        svg.select(".y-axis")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            // .attr("transform", "translate(0," + height + ")")
            .call(axisLeft(yScale));

        // g.append("g") // y
        //     .attr("class", "axis axis--y")
        //     .call(axisLeft(y));
        svg.append("path")
            .datum(data)
            .attr("class", "line") // (CSS)
            .transition()
            .duration(750)
            .attr("fill", "none")
            .attr("x", "40")
            .attr("stroke", "blue")
            .attr("stroke-width", "1px")
            .ease(easeLinear)
            .attr("d", myLine);

        // g.append("g")
        //     .attr("clip-path", "url(#clip)")
        //     .append("path")
        //     .datum(data)
        //     .attr("class", "line") // (CSS)
        //     .transition()
        //     .duration(750)
        //     .ease(easeLinear);
    };

    const onClick = () => {
        //xXcale.domain 을 수정한다. 뒤에 하나추가, 앞에서 하나 제거
        /*
        x axis 를 선택해서 transtion 적용
        */

        const now: any = new Date();
        const duration = 750;
        var n = 243;
        const svg: any = select(svgRef.current);

        var margin = { top: 20, right: 20, bottom: 20, left: 40 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var x: any = scaleTime()
            .domain([now - (n - 2) * duration, now - duration])
            .range([0, width]);

        var myLine: any = line()
            .x(function (d, i: any) {
                return x(now - (n - 1 - i) * duration);
            })
            .y(function (d: any, i) {
                return y(d);
            });

        var y = scaleLinear().range([height, 0]);

        var myLine: any = line()
            .x(function (d, i: any) {
                return x(now - (n - 1 - i) * duration);
            })
            .y(function (d: any, i) {
                return y(d);
            });
        svg.select(".x-axis")
            .transition()
            .attr(
                "transform",
                `translate(${margin.left}, ${height + margin.bottom})`
            )
            .call((x.axis = axisBottom(x)));

        data.push(1);
        svg.select(".line").attr("d", myLine).attr("transform", null);
        data.shift();
    };

    /*
    1. 라인차트 최대값 기준?
    */

    // 라인차트 데이터
    // 초기에 10분 단위를 조회해서 보여준다.
    // 이후 5초 단위로 조회해서 차트를 갱신한다. -> 데이터가 없음. 어떻게?
    useEffect(() => {
        const start = Date.now() - 1000 * 5;
        // const start = Date.now() - 1000 * 60 * 5;
        const end = Date.now();
        api.series("transaction/{stime}/{etime}", {
            stime: start,
            etime: end,
        }).then((result) => {
            // console.log(new Date(start), new Date(end));
            console.log("result", result.data);
        });

        // 정적 차트
        // draw1();

        // 동적 차트
        draw2();
    }, []);

    return (
        <div>
            <button onClick={onClick}>이동</button>
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
