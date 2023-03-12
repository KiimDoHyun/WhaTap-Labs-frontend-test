import React from "react";
import styled from "styled-components";

interface PropsType {
    selectedRealTime: number;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const RealTime = ({ selectedRealTime, onClick }: PropsType) => {
    return (
        <RealTimeBlock onClick={onClick}>{selectedRealTime}분</RealTimeBlock>
    );
};

const RealTimeBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: rgb(0, 181, 67);
    color: white;
    border-radius: 2px;
    padding: 0px 4px;
    font-size: 11px;
`;

export default RealTime;
