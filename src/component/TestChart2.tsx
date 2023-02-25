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
import React, { useEffect, useRef, useState } from "react";
import api from "../api";

const TestChart2 = () => {
    const svgRef = useRef(null);
    const [data, setData] = useState(null);

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
            duration = 750, // x축 이동 속도 조절
            now: any = new Date(Date.now() - duration),
            count = 0,
            data = range(n).map(function () {
                return 0;
            });

        var margin = { top: 20, right: 20, bottom: 20, left: 40 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg
                .append("g")
                .attr(
                    "transform",
                    "translate(" + margin.left + "," + margin.top + ")"
                );

        var x: any = scaleTime()
            .domain([now - (n - 2) * duration, now - duration])
            .range([0, width]);

        var y = scaleLinear().range([height, 0]);

        var myLine: any = line()
            .x(function (d, i: any) {
                return x(now - (n - 1 - i) * duration);
            })
            .y(function (d: any, i) {
                return y(d);
            });

        g.append("defs")
            .append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        var axis = g
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call((x.axis = axisBottom(x)));

        g.append("g") // y
            .attr("class", "axis axis--y")
            .call(axisLeft(y));

        g.append("g")
            .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(data)
            .attr("class", "line") // (CSS)
            .transition()
            .duration(750)
            .ease(easeLinear);
        // .on("start", tick);

        function tick(this: any) {
            console.log("???", this);
            // this: path
            now = new Date();
            x.domain([now - (n - 2) * duration, now - duration]);
            y.domain([0, max(data)]);
            data.push(Math.min(30, count));
            count = 0;

            select(this).attr("d", myLine).attr("transform", null);

            axis.transition().duration(750).ease(easeLinear).call(x.axis);

            // 현재 tracsition이 활성화된 노드 반환?
            active(this)
                .attr(
                    "transform",
                    "translate(" + x(now - (n - 1) * duration) + ")"
                )
                .transition()

                .on("start", tick);

            data.shift();
        }
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
            width = +svg.attr("width") - margin.left - margin.right;

        var x: any = scaleTime()
            .domain([now - (n - 2) * duration, now - duration])
            .range([0, width]);

        svg.select(".x-axis")
            .transition()
            .call((x.axis = axisBottom(x)));

        // console.log(active(this));
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
