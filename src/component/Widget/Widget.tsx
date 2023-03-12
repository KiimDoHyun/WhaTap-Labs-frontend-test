import styled from "styled-components";
import useBoolean from "../../hook/useBoolean";
// import { WidgetPropsType } from "../../types/widget";
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

props 전달을 줄이기 위해서 각 위젯의 내부에서만 사용할 데이터를 Context로 관리 해야하는가?
각 위젯 내부에서만 사용할 지역 변수인데?
대신 customHook으로 공통화 한다면?

=================

위젯의 api 호출 관련 로직을 추상화 한다 -> customHook 으로?
(위젯에서만 사용할 로직들을 customHook으로?)

vs

차트생성 관련 로직은 모두 추상화 했다. 
왜?
d3.js 로 생성되는 차트에만 사용되는 로직들이지만 컴포넌트에서 '어떻게'가 아닌 '무엇을' 하는지 보여주기 위해

따라서 각 차트 컴포넌트는 무엇을 하는지만 관심이 있다.
ex) createLineXScale 로 라인차트의 xScale을 생성한다. 어떻게 생성하는지는 관심 X

-> 그렇다면
실제 로직을 컴포넌트에서 어떻게 구현되는지 보여주는 대신 모두 customHook으로 대체한다.
각 컴포넌트는 무엇을 하는지에 대해서만 관심을 가진다.
"어떻게는" 각 customHook에 구현되어있다.

Presentational container 와 비교
로직의 구현 / 출력이 구분되는 점은 동일하다.
로직을 다른 컴포넌트도 사용할 수 있는점이 다르다.

위젯에서만 사용될 로직도 customHook 으로 만들어야 하는가?
로직을 훅으로 분리하면서 가독성이 향상되고, 추후 타 컴포넌트도 사용이 가능하다.

그렇다면 모든 컴포넌트는 이와 같이 작성 되어야 하는가?
비즈니스 로직과 스타일의 구분을 이와 같은 방법으로 하는게 좋은가? (-> 이는 결국 customHook 패턴이다.)



어떻게 변경 되었는가?

Widget 컴포넌트의 역할은 동일함
1. api 호출
2. api 호출 주기 변경
3. api 호출 결과를 차트에 전달 및 적절한 차트의 출력

api 호출, 호출 주기 변경, 관련 state를 커스텀 훅으로 구현

Widget 컴포넌트 자체는 구체적인 로직을 더이상 가지고 있지 않음

1. : useHandleWidgetApi
2. : WidgetCallCycleSettingModal
3. : WidgetChart

어쨋든 로직을 분리하긴 했으나 하위 컴포넌트로 전달하는 props 들이 너무 많다.

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
