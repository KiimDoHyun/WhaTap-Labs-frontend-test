import {
    axisBottom,
    axisLeft,
    curveMonotoneX,
    line,
    randomUniform,
    range,
    scaleLinear,
    select,
} from "d3";
import React, { useEffect, useRef, useState } from "react";
import api from "../api";

const TestChart2 = () => {
    const svgRef = useRef(null);
    const [data, setData] = useState(null);

    /*
    1. 라인차트 최대값 기준?
    */

    // 라인차트 데이터
    useEffect(() => {
        api.series("transaction/{stime}/{etime}", {
            // stime: Date.now() - HOUR,
            // stime: Date.now() - 1000 * 5,
            stime: Date.now() - 1000 * 5,
            // stime: Date.now() - 1000 * 60 * 5,
            etime: Date.now(),
        }).then((result) => {
            // console.log(new Date(Date.now() - 5000));
            console.log("result", result.data);
            // setHttpcSeries(result);
        });

        const svg: any = select(svgRef.current);

        let n = 10;

        // Max값의 기준?
        let xScale = scaleLinear().domain([0, 10]).range([50, 450]);

        // y 축은 시간을 나타내야 한다.
        let yScale = scaleLinear().domain([0, 1]).range([450, 50]);

        let myLine = line()
            .x(function (d, i) {
                return xScale(i);
            })
            .y(function (d: any, i) {
                return yScale(d.y);
            });
        // .curve(curveMonotoneX);

        let dataSet = range(n).map((d) => ({ y: randomUniform(1)() }));

        console.log(dataSet);
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
        svg.selectAll(".dot")
            .data(dataSet)
            .enter()
            .append("circle")
            .attr("cx", function (d: any, i: any) {
                return xScale(i);
            })
            .attr("cy", function (d: any, i: any) {
                return yScale(d.y);
            })
            .attr("r", 5);
    }, []);
    return (
        <div>
            <div>
                Time <div className="infoIcon"></div>
            </div>
            <div style={{ height: "500px", width: "500px" }}>
                <svg ref={svgRef} style={{ height: "100%", width: "100%" }}>
                    <g className="y-axis" />
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    );
};

export default TestChart2;
