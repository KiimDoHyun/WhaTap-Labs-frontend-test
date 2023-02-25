import api from "./api";
import TestChart1 from "./component/TestChart1";
import TestChart2 from "./component/TestChart2";
import TestChart3 from "./component/TestChart3";
const HOUR = 1000 * 60 * 60;
/*
Todo: 디자인 (전체 레이아웃, 반응형)
*/
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

    /*
    현재시간 기준 5초 동안의 데이터 조회 테스트

    transaction: 데이터 없음

    */

    // }, []);

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
            <TestChart2 />
            <TestChart3 />

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
