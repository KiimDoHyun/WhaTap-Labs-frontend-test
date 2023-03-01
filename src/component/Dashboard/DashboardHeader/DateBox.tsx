import React from "react";
import styled from "styled-components";

const DateBox = ({ dateInfo }: any) => {
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
