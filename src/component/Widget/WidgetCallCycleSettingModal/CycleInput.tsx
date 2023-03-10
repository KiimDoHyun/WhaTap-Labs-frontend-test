import React from "react";
import styled from "styled-components";

interface CycleInputPropsType {
    value: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CycleInput = ({ value, onChange }: CycleInputPropsType) => {
    return (
        <CycleInputBlock>
            <label htmlFor="cycleInput">호출 주기 (초)</label>
            <input id="cycleInput" value={value} onChange={onChange} />
        </CycleInputBlock>
    );
};

const CycleInputBlock = styled.div``;
export default CycleInput;
