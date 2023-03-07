import { useContext } from "react";
import styled from "styled-components";
import useBoolean from "../../../hook/useBoolean";
import useOutsideClick from "../../../hook/useOutsideClick";
import { DashboardContext } from "../../../store/DashboardProvider";
import { callApiObjectType } from "../../../types/widget";
import { PickerAreaBlock, PickerBoxBlock } from "../CommonStyle";
import RealTime from "./RealTime";
import SelectRealTimeListItem from "./SelectRealTimeListItem";

const realTimeList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const SelectRealTimeRangeArea = () => {
    const [callApiObject, setCallApiObject] = useContext(DashboardContext);

    const { state: isActiveRealTimeList, setFalse, toggle } = useBoolean(false);

    const RealTimeBlockRef = useOutsideClick(setFalse);

    const onClickRealTimeList = (input: number) => {
        toggle();

        // 실시간 조회 범위 갱신
        setCallApiObject((callApiObject: callApiObjectType) => ({
            ...callApiObject,
            status: "NOW",
            nowBody: {
                range: input,
            },
        }));
    };

    return (
        <PickerAreaBlock ref={RealTimeBlockRef}>
            <RealTime
                selectedRealTime={callApiObject.nowBody.range}
                onClick={toggle}
            />

            <PickerBoxBlock isActive={isActiveRealTimeList}>
                <SelectList>
                    {realTimeList.map((item: number) => (
                        <SelectRealTimeListItem
                            key={item}
                            range={item}
                            onClick={onClickRealTimeList}
                            prevSelectedRange={callApiObject.nowBody.range}
                        />
                    ))}
                </SelectList>
            </PickerBoxBlock>
        </PickerAreaBlock>
    );
};

const SelectList = styled.ul`
    list-style: none;
    padding: 0;
    width: 50px;
`;

export default SelectRealTimeRangeArea;
