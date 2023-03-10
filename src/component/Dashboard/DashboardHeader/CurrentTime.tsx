import React from "react";
import styled from "styled-components";
import useCurrentTime from "../../../hook/useCurrentTime";

interface CurrentTimePropsType {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CurrentTime = ({ onClick }: CurrentTimePropsType) => {
    const { hour, min, sec } = useCurrentTime();

    return (
        <CurrentTimeBlock onClick={onClick}>
            {hour}:{min}:{sec}
        </CurrentTimeBlock>
    );
};

const CurrentTimeBlock = styled.div`
    display: flex;
    align-items: center;
`;
export default React.memo(CurrentTime);
