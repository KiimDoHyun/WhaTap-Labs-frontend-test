import React from "react";
import styled from "styled-components";
import { dateType } from "../../../types/common";

interface DatePickerTitlePropsType {
    type: string;
    date: dateType;
}

const DatePickerTitle = ({ type, date }: DatePickerTitlePropsType) => {
    return (
        <DatePickerTitleBlock>
            <div>{type === "start" ? "조회 시작" : "조회 종료"}</div>
            <div>{`${date.year}/${date.month}/${date.date} ${date.hour}:${date.min}`}</div>
        </DatePickerTitleBlock>
    );
};

const DatePickerTitleBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;
export default DatePickerTitle;
