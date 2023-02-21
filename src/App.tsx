import { axisBottom, axisLeft, axisRight, scaleBand, scaleLinear, select } from 'd3'
import { useEffect, useRef, useState } from 'react'
import api from './api'
const HOUR = 1000 * 60 * 60

function App() {
  const [actAgent, setActAgent] = useState<any>()
  const [httpcSeries, setHttpcSeries] = useState<any>()

  useEffect(() => {

    // api.spot('act_agent').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('inact_agent').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('host').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('cpucore').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('txcount').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('tps').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('actx').then((result) => {console.log(result); setActAgent(result)})
    api.spot('rtime').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('cpu').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('threadpool_active').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('threadpool_queue').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('dbc_count').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('dbc_active').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('dbc_idle').then((result) => {console.log(result); setActAgent(result)})
    // api.spot('act_method').then((result) => {console.log(result); setActAgent(result)})
    api
      .series('transaction/{stime}/{etime}', { stime: Date.now() - HOUR, etime: Date.now() })
      .then((result) => {console.log('result series:', result); setHttpcSeries(result)})

  }, [])

  const svgRef = useRef(null);

  useEffect(() => {
    // 테스트 데이터
    const data = [10,30,50,130];

    // bar 차트 생성
    const svg: any = select(svgRef.current);

    const xScale = scaleBand()
    .domain(['1번', '2번','3번','4번'])
    .range([20, 480])
    // .padding(0.5);

    const yscale = scaleLinear()
    .domain([0, 200]) //실제값의 범위
    .range([480, 20]); //변환할 값의 범위(역으로 처리했음!), 위아래 패딩 20을 줬다!. 차트를 그리기 위해 높이를 지정한다.
    
    const xAxis = axisBottom(xScale).ticks(4);
    svg
      .select(".x-axis")
      .style("transform", "translateY(450px)")
      .call(xAxis);

    const yAxis = axisLeft(yscale);
    svg
      .select('.y-axis')
      .attr('height', '100%')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis)

      // 막대 그리기
      svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (value: any, index: any) => xScale(index))
      .attr("y", yscale)
      .attr("width", xScale.bandwidth()) 
      .attr("height", (value: any, index: any) => 150 - yscale(value));
  }, [])

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
      <div style={{height: '500px', width: '500px'}}>
        <svg ref={svgRef} style={{height: '100%', width: '100%'}}>
          <g className='y-axis'/>
          <g className='x-axis'/>
        </svg>
      </div>
      <h1>Open API (Application)</h1>
      <a href='https://docs.whatap.io/kr/appendix/open_api_application.pdf' target='_blank'>
        가이드 문서
      </a>
      <h2>프로젝트 API 예시</h2>
      <h3>Spot 정보 조회 URL</h3>
      <pre>{JSON.stringify(actAgent, null, 4)}</pre>
      <hr />
      <h3>통계 정보 조회 URL</h3>
      <pre>{JSON.stringify(httpcSeries, null, 4)}</pre>
    </div>
  )
}

export default App
