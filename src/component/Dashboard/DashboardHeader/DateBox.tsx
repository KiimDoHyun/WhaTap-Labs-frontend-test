import React from "react";
import styled from "styled-components";

interface dateType {
    year: number;
    month: string;
    date: string;
    hour: string;
    min: string;
    sec: string;
}

interface PropsType {
    dateInfo: dateType;
}

const DateBox = ({ dateInfo }: PropsType) => {
    return (
        <DateBoxBlock>
            <div className="area1">{`${dateInfo.year}/${dateInfo.month}/${dateInfo.date}`}</div>
            <div className="area2">{`${dateInfo.hour}:${dateInfo.min}`}</div>
        </DateBoxBlock>
    );
};

const DateBoxBlock = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;

    .area2 {
        font-size: 14px;
        font-weight: bold;
    }
`;
export default DateBox;
