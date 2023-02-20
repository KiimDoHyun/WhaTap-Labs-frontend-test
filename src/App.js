import { useEffect, useState } from 'react'
import api from './api'
const HOUR = 1000 * 60 * 60
function App() {
  const [actAgent, setActAgent] = useState()
  const [httpcSeries, setHttpcSeries] = useState()

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
      .series('exception/{stime}/{etime}', { stime: Date.now() - HOUR, etime: Date.now() })
      .then((result) => {console.log('result series:', result); setHttpcSeries(result)})
      api
      .series('sql/{stime}/{etime}', { stime: Date.now() - HOUR, etime: Date.now() })
      .then((result) => {console.log('result series:', result); setHttpcSeries(result)})
  }, [])

  return (
    <div style={{ padding: 20 }}>
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
