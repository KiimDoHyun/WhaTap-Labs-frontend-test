import styled from "styled-components";
import {
    PickerAreaBlock,
    PickerBoxBlock,
} from "../../../asset/style/DashboardHeader";
import useBoolean from "../../../hook/useBoolean";
import useOutsideClick from "../../../hook/useOutsideClick";
import RealTime from "./RealTime";
import SelectRealTimeListItem from "./SelectRealTimeListItem";

const realTimeList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

interface dateType {
    year: number;
    month: string;
    date: string;
    hour: string;
    min: string;
    sec: string;
}

interface callApiObjectType {
    status: string;
    pastBody: {
        startDate: dateType;
        endDate: dateType;
    };
    nowBody: {
        range: number;
    };
}

interface PropsType {
    range: number;
    setCallApiObject: React.Dispatch<React.SetStateAction<callApiObjectType>>;
}

const SelectRealTimeRangeArea = ({ range, setCallApiObject }: PropsType) => {
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
            <RealTime selectedRealTime={range} onClick={toggle} />

            <PickerBoxBlock isActive={isActiveRealTimeList}>
                <SelectList>
                    {realTimeList.map((item: number) => (
                        <SelectRealTimeListItem
                            key={item}
                            range={item}
                            onClick={onClickRealTimeList}
                            prevSelectedRange={range}
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
