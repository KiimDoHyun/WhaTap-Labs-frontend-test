import React from "react";
import styled from "styled-components";

interface PropsType {
    value: number | string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CycleInput = ({ value, onChange }: PropsType) => {
    return (
        <CycleInputBlock>
            <label htmlFor="cycleInput">호출 주기 (초)</label>
            <input
                id="cycleInput"
                value={value}
                onChange={onChange}
                type={"number"}
            />
        </CycleInputBlock>
    );
};

const CycleInputBlock = styled.div``;
export default CycleInput;
