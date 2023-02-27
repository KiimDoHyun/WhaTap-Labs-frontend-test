import api from "./api";
import BarChart from "./component/BarChart";
import LineChart from "./component/LineChart";
import InformaticsChart from "./component/InformaticsChart";
import styled from "styled-components";
import Widget from "./component/Widget";
import { WidgetPropsType } from "./types/widget";
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

    // 타입을 지정하지 않으면 chartType 이 string이 된다. (자동 추론)
    // 실제 타입은 특정 값만 받도록 되어있기 때문에 에러가 발생한다.
    // 명시적으로 타입을 지정해서 해결한다.
    const barChartProps: WidgetPropsType = {
        chartType: "BAR",
        apiKey: {
            spot: [
                "act_method",
                "act_sql",
                "act_httpc",
                "act_dbc",
                "act_socket",
            ],
        },
    };

    return (
        <div style={{ padding: 20 }}>
            <TestArea>
                <TestRow>
                    <TestCol className="width10">
                        <InformaticsChart />
                    </TestCol>
                    <TestCol className="width40">
                        {/* <BarChart /> */}
                        <Widget {...barChartProps} />
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
