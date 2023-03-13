import styled from "styled-components";
import useBoolean from "../../hook/useBoolean";
import WidgetButtons from "./WidgetButtons";
import WidgetChart from "./WidgetChart";
import WidgetCallCycleSettingModal from "./WidgetCallCycleSettingModal";
import useHandleWidgetApi from "../../hook/Widget/useHandleWidgetApi";

/*

위젯의 역할
? 1. api 호출
? 2. 호출 주기 변경
? 3. 차트 출력

===
? 1. api 호출 관련 로직만 남긴다.
? 2. 호출 주기 변경 로직은 모달에서 처리한다.
    ? T extends <T>(inputValue: T) => void extends <T>(inputValue: T) => void 주기 변경함수를 전달한다 : 기능의 분리가 이루어 지지 않은듯 하다.
    ? - 주기 변경함수를 모달에서 구현한다. : 기능구현을 위해 너무 많은 props 전달이 발생한다.
? 3. 차트 출력은 WidgetChart 에서 분기해서 처리하도록 한다.

*/

interface PropsType {
    chartType: string;
    apiKey: { type: string; keys: string[] };
    widgetId: number;
}

const Widget = ({ chartType, apiKey, widgetId }: PropsType) => {
    // 필요한 데이터만 사용
    // 마지막 호출 시간, 차트 데이터, api 호출 정보, 호출 주기 변경함수
    const { lastCallTime, dataSource, apiInfo, onClickApplyCallCycle } =
        useHandleWidgetApi({ apiKey: apiKey });

    // 호출 주기 변경 모달 제어 State
    const {
        state: activeWidgetModal,
        setTrue: setTrueActiveWidgetModal,
        setFalse: setFalseActiveWidgetModal,
    } = useBoolean(false);

    return (
        <WidgetBlock>
            <WidgetButtons
                setTrueActiveWidgetModal={setTrueActiveWidgetModal}
                widgetId={widgetId}
                chartType={chartType}
                apiKey={apiKey}
            />

            {/* 차트 */}
            <WidgetChart
                chartType={chartType}
                dataSource={dataSource}
                apiInfo={apiInfo}
            />

            {/* 모달 */}
            <WidgetCallCycleSettingModal
                show={activeWidgetModal}
                onHide={setFalseActiveWidgetModal}
                lastCallTime={lastCallTime}
                onClickApplyCallCycle={onClickApplyCallCycle}
            />
        </WidgetBlock>
    );
};

const WidgetBlock = styled.div`
    width: 100%;
    height: 100%;
`;

export default Widget;
