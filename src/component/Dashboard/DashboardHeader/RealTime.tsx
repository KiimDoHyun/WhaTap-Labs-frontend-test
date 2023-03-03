import React from "react";
import styled from "styled-components";

interface RealTimePropsType {
    selectedRealTime: number;
}

const RealTime = ({ selectedRealTime }: RealTimePropsType) => {
    return <RealTimeBlock>{selectedRealTime}분</RealTimeBlock>;
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
