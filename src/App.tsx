import styled from "styled-components";
import Router from "./router/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
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

    return (
        <div style={{ padding: 20 }}>
            <Router />
            {/* <TestArea>
                <TestRow>
                    <TestCol className="width10">
                        <InformaticsChart />
                    </TestCol>
                    <TestCol className="width40">
                        <Widget {...barChartProps} />
                    </TestCol>
                    <TestCol className="width50">
                        <LineChart />
                    </TestCol>
                </TestRow>
            </TestArea> */}
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
