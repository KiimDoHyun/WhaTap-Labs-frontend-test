import React from "react";
import styled from "styled-components";

interface RealTimePropsType {
    selectedRealTime: number;
    isRealTime: boolean;
}

const RealTime = ({ selectedRealTime, isRealTime }: RealTimePropsType) => {
    return (
        <RealTimeBlock isRealTime={isRealTime}>
            <Dot isRealTime={isRealTime} />
            {isRealTime ? `실시간 ${selectedRealTime}분` : "특정 구간 조회중"}
        </RealTimeBlock>
    );
};

const RealTimeBlock = styled.div<{ isRealTime: boolean }>`
    display: flex;
    align-items: center;
    gap: 5px;

    color: ${({ isRealTime }) => (isRealTime ? "black" : "lightgray")};
`;

const Dot = styled.div<{ isRealTime: boolean }>`
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: ${({ isRealTime }) => (isRealTime ? "red" : "gray")};
`;

export default RealTime;
