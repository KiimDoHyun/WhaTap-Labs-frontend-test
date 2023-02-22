import {
    axisBottom,
    axisLeft,
    axisRight,
    scaleBand,
    scaleLinear,
    select,
} from "d3";
import { useEffect, useRef, useState } from "react";
import api from "./api";
import TestChart1 from "./component/TestChart1";
const HOUR = 1000 * 60 * 60;

function App() {
    // const [actAgent, setActAgent] = useState<any>();
    // const [httpcSeries, setHttpcSeries] = useState<any>();

    // useEffect(() => {
    //     // api.spot('act_agent').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('inact_agent').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('host').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('cpucore').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('txcount').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('tps').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('actx').then((result) => {console.log(result); setActAgent(result)})
    //     api.spot("rtime").then((result) => {
    //         console.log(result);
    //         setActAgent(result);
    //     });
    //     // api.spot('cpu').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('threadpool_active').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('threadpool_queue').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('dbc_count').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('dbc_active').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('dbc_idle').then((result) => {console.log(result); setActAgent(result)})
    //     // api.spot('act_method').then((result) => {console.log(result); setActAgent(result)})
    //     api.series("transaction/{stime}/{etime}", {
    //         stime: Date.now() - HOUR,
    //         etime: Date.now(),
    //     }).then((result) => {
    //         console.log("result series:", result);
    //         setHttpcSeries(result);
    //     });
    // }, []);

    // const svgRef = useRef(null);

    // const [data, setData] = useState([
    //     { x: "A", y: 9 },
    //     { x: "B", y: 19 },
    //     { x: "C", y: 29 },
    //     { x: "D", y: 39 },
    //     { x: "E", y: 29 },
    // ]);

    // const onClick = () => {
    //     const rand_0_1 = Math.floor(Math.random() * 2);

    //     const newData = data.map((item) => ({
    //         ...item,
    //         y: rand_0_1 === 0 ? (item.y += 10) : (item.y -= 10),
    //     }));

    //     setData(newData);
    //     const svg: any = select(svgRef.current);

    //     const xScale = scaleBand() // x 축
    //         .domain(newData.map((item) => item.x))
    //         .range([50, 450]);
    //     // .padding(0.5);

    //     svg.selectAll(".bar")
    //         .data(newData)
    //         // css: trasition: 500 과 동일함
    //         .transition()
    //         // .duration(500)
    //         // 모든 데이터가 변경되는 경우 딜레이를 추가할 수 있음.
    //         .delay((d: any, i: any) => i * 100)
    //         .attr("class", "bar")
    //         // 첫번째 인자에 배열의 요소가, 두번째 인자에 인덱스가 들어있음.
    //         .attr("height", function (d: any, i: any) {
    //             return d.y * 5;
    //         }) // 높이는 각 값의 *5 만큼 크기로
    //         .attr("width", 25) // 너비는 25로
    //         .attr("x", function (d: any, i: string) {
    //             return xScale(d.x) + 25;
    //         }) // x 위치는 해당 값의 x축의 위치로
    //         .attr("y", function (d: any, i: any) {
    //             return 450 - d.y * 5;
    //         }); // y 는 원래 높이에서 해당 높이를 뺀 만큼
    // };

    // useEffect(() => {
    //     console.log("data: ", data);

    //     // bar 차트 생성
    //     const svg: any = select(svgRef.current);

    //     const xScale = scaleBand() // x 축
    //         .domain(data.map((item) => item.x))
    //         .range([50, 450]);
    //     // .padding(0.5);

    //     const yScale = scaleLinear() // y 축
    //         .domain([0, 200]) // 실제값의 범위, // 최대값 찾아서 범위 지정?
    //         .range([450, 50]); // 차트를 그리기 위해 크기를 지정.

    //     const xAxis = axisBottom(xScale).ticks(4);
    //     svg.select(".x-axis")
    //         .style("transform", "translateY(450px)")
    //         .call(xAxis);

    //     const yAxis = axisLeft(yScale);
    //     svg.select(".y-axis")
    //         .attr("height", "100%")
    //         .attr("transform", "translate(50, 0)")
    //         .call(yAxis);

    //     // 데이터 수정 관련 transition, duration을 여기에 추가하면 작동하지 않음.
    //     // 외부 이벤트에서 조작해야 한다?

    //     svg.selectAll(".bar")
    //         .data(data)
    //         .enter()
    //         .append("rect")
    //         // 작동 X
    //         // .transition()
    //         // .duration(500)
    //         .attr("class", "bar")
    //         // 첫번째 인자에 배열의 요소가, 두번째 인자에 인덱스가 들어있음.
    //         .attr("height", function (d: any, i: any) {
    //             return d.y * 5;
    //         }) // 높이는 각 값의 *5 만큼 크기로
    //         .attr("width", 25) // 너비는 25로
    //         .attr("x", function (d: any, i: string) {
    //             return xScale(d.x) + 25;
    //         }) // x 위치는 해당 값의 x축의 위치로
    //         .attr("y", function (d: any, i: any) {
    //             return 450 - d.y * 5;
    //         }); // y 는 원래 높이에서 해당 높이를 뺀 만큼
    // }, [data]);

    return (
        <div style={{ padding: 20 }}>
            {/* 인포메틱스 4개 */}

            {/* d3로 제작 */}
            {/* 바 차트1 - 트랜잭션 관련 3개 */}
            {/* 바 차트2 - 쓰레드 풀 관련 2개 */}
            {/* json 하나 정해서 라인 
      x: 호출 시간
      y: 호출 값 전부
      */}
            <TestChart1 />
            {/* <div style={{ height: "500px", width: "500px" }}>
                <svg ref={svgRef} style={{ height: "100%", width: "100%" }}>
                    <g className="y-axis" />
                    <g className="x-axis" />
                </svg>
            </div> */}
            {/* <button onClick={onClick}>데이터 변경</button> */}

            <h1>Open API (Application)</h1>
            <a
                href="https://docs.whatap.io/kr/appendix/open_api_application.pdf"
                target="_blank"
            >
                가이드 문서
            </a>
            <h2>프로젝트 API 예시</h2>
            <h3>Spot 정보 조회 URL</h3>
            {/* <pre>{JSON.stringify(actAgent, null, 4)}</pre> */}
            <hr />
            <h3>통계 정보 조회 URL</h3>
            {/* <pre>{JSON.stringify(httpcSeries, null, 4)}</pre> */}
        </div>
    );
}

export default App;
