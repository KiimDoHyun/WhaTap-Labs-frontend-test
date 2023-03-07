import React, { useContext, useState } from "react";
import styled from "styled-components";
import { createDateObj } from "../../../common/date";
import useBoolean from "../../../hook/useBoolean";
import useOutsideClick from "../../../hook/useOutsideClick";
import { DashboardContext } from "../../../store/DashboardProvider";
import { callApiObjectType } from "../../../types/widget";
import DatePicker from "../../common/DatePicker";
import { PickerAreaBlock, PickerBoxBlock } from "../CommonStyle";
import DateBox from "./DateBox";

const DatePickerArea = () => {
    const [callApiObject, setCallApiObject] = useContext(DashboardContext);

    const { state: isActiveDatePicker, setFalse, toggle } = useBoolean(false);

    const DateBoxBlockRef = useOutsideClick(setFalse);

    // 선택된 범위 정보 (최종 적용은 확인 버튼이후)
    const [selectedStartDate, setSelectedStartDate] = useState(
        createDateObj(
            new Date(Date.now() - 1000 * 60 * callApiObject.nowBody.range)
        )
    );
    const [selectedEndDate, setSelectedEndDate] = useState(
        createDateObj(new Date(Date.now()))
    );

    // 선택된 구간 적용 확인 클릭 이벤트
    const onClickConfirm = () => {
        if (window.confirm("조회 범위를 변경하시겠습니까?")) {
            setCallApiObject((callApiObject: callApiObjectType) => ({
                ...callApiObject,
                status: "PAST",
                pastBody: {
                    startDate: selectedStartDate,
                    endDate: selectedEndDate,
                },
            }));
            toggle();
        }
    };

    return (
        <PickerAreaBlock ref={DateBoxBlockRef}>
            <DisplaySelectedRangeBox onClick={toggle}>
                <DateBox dateInfo={callApiObject.pastBody.startDate} />
                ~
                <DateBox dateInfo={callApiObject.pastBody.endDate} />
            </DisplaySelectedRangeBox>
            <PickerBoxBlock isActive={isActiveDatePicker}>
                <DatePickerBox>
                    <DatePicker
                        date={selectedStartDate}
                        setDate={setSelectedStartDate}
                        type={"start"}
                    />
                    <DatePicker
                        date={selectedEndDate}
                        setDate={setSelectedEndDate}
                        type={"end"}
                    />
                </DatePickerBox>
                <ButtonBox>
                    <button onClick={toggle}>닫기</button>
                    <button onClick={onClickConfirm}>확인</button>
                </ButtonBox>
            </PickerBoxBlock>
        </PickerAreaBlock>
    );
};

const DisplaySelectedRangeBox = styled.div`
    display: flex;
    gap: 5px;
`;

const DatePickerBox = styled.div`
    display: flex;
`;

const ButtonBox = styled.div`
    display: flex;

    margin-top: 10px;
    justify-content: flex-end;
`;

export default DatePickerArea;
