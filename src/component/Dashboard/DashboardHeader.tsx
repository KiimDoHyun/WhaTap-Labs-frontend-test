import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "../../common/DatePicker";
import DateBox from "./DashboardHeader/DateBox";

const DashboardHeader = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}: any) => {
    const [isClickDate, setIsClickDate] = useState(false);

    const toggle = () => {
        setIsClickDate(!isClickDate);
    };

    const onClickConfirm = () => {
        //
    };

    return (
        <DashboardHeaderBlock>
            <TitleBlock onClick={toggle}>
                <DateBox dateInfo={startDate} />
                ~
                <DateBox dateInfo={startDate} />
            </TitleBlock>
            <DatePickerBlock isClickDate={isClickDate}>
                <div className="pickArea">
                    <DatePicker date={startDate} setDate={setStartDate} />
                    <DatePicker date={endDate} setDate={setEndDate} />
                </div>
                <div className="buttonArea">
                    <button onClick={toggle}>닫기</button>
                    <button onClick={onClickConfirm}>확인</button>
                </div>
            </DatePickerBlock>
        </DashboardHeaderBlock>
    );
};

const DashboardHeaderBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: relative;
`;
const TitleBlock = styled.div`
    display: flex;
    gap: 10px;
    border: 1px solid black;
    cursor: pointer;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 12px;
`;

const DatePickerBlock = styled.div<{ isClickDate: boolean }>`
    position: absolute;
    top: 35px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;

    display: ${({ isClickDate }) => (isClickDate ? "block" : "none")};

    .buttonArea,
    .pickArea {
        display: flex;
    }

    .buttonArea {
        margin-top: 10px;
        justify-content: flex-end;
    }
`;

export default DashboardHeader;
