import api from "./api";
import BarChart from "./component/BarChart";
import LineChart from "./component/LineChart";
import TestChart3 from "./component/TestChart3";
import styled from "styled-components";
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

            {/* <TestChart3 /> */}

            {/* 
            한줄에 모두 표시한다.

            1. 12칸으로 나눈다.

            1:5:6 으로 차지한다.

            화면이 작아지면
            1:11:12 로 변경된다.

            더 작아지면

            12:12:12 로
            각 차트가 차지하는 칸 크기에 맞춰서 차트가 업데이트 된다.

            2. wrap 을 고려하지 않는다.

            한줄에 놓인 각 컴포넌트를 % 비율로 가지고 있도록한다.

            전체 컨테이너의 최소 크기를 지정한다: 1024px


            직접 구현할지 외부 라이브러리를 사용할지

            차트를 직접 만드는데 스타일은 외부라이브러리로?
            차트를 직접 만드는데 스타일도 직접?
            */}

            <TestArea>
                <TestRow>
                    <TestCol className="width10">
                        <TestChart3 />
                    </TestCol>
                    <TestCol className="width40">
                        <BarChart />
                    </TestCol>
                    <TestCol className="width50">
                        <LineChart />
                    </TestCol>
                </TestRow>
            </TestArea>

            {/* <h1>Open API (Application)</h1>
            <a
                href="https://docs.whatap.io/kr/appendix/open_api_application.pdf"
                target="_blank"
            >
                가이드 문서
            </a>
            <h2>프로젝트 API 예시</h2>
            <h3>Spot 정보 조회 URL</h3>
            <pre>{JSON.stringify(actAgent, null, 4)}</pre>
            <hr />
            <h3>통계 정보 조회 URL</h3>
            <pre>{JSON.stringify(httpcSeries, null, 4)}</pre> */}
        </div>
    );
}

const TestArea = styled.div`
    width: 100%;
    border: 1px solid;
    box-sizing: border-box;

    min-width: 1024px;
`;

const TestRow = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    gap: 10px;
    padding: 10px;
    box-sizing: border-box;

    .width10 {
        width: 10%;
    }

    .width40 {
        width: 40%;
    }

    .width50 {
        width: 50%;
    }
`;
const TestCol = styled.div`
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
`;

const Box = styled.div``;

export default App;
