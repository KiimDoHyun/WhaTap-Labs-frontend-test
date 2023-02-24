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

        let margin = { top: 50, right: 50, bottom: 50, left: 50 };
        let width = (window.innerWidth = margin.left - margin.right);
        let height = (window.innerHeight = margin.top - margin.bottom);

        let n = 10;

        let xScale = scaleLinear().domain([0, 10]).range([0, 500]);

        let yScale = scaleLinear().domain([0, 1]).range([500, 0]);

        let myLine = line()
            .x(function (d, i) {
                return xScale(i);
            })
            .y(function (d: any, i) {
                return xScale(d.y);
            })
            .curve(curveMonotoneX);

        let dataSet = range(n).map((d) => ({ y: randomUniform(1)() }));

        svg.select(".x-axis")
            .attr("transform", "translate(0, 450)")
            .call(axisBottom(xScale));
        svg.select(".y-axis").call(axisLeft(yScale));

        svg.append("path")
            .datum(dataSet)
            .attr("class", "line")
            .attr("d", myLine);

        console.log(dataSet);
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
