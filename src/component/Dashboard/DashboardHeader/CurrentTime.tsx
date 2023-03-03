import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CurrentTime = ({ onClick }: any) => {
    const now = new Date(Date.now());

    const [hour, setHour] = useState(`0${now.getHours()}`.slice(-2));
    const [min, setMin] = useState(`0${now.getMinutes()}`.slice(-2));
    const [sec, setSec] = useState(`0${now.getSeconds()}`.slice(-2));

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date(Date.now());
            setHour(`0${now.getHours()}`.slice(-2));
            setMin(`0${now.getMinutes()}`.slice(-2));
            setSec(`0${now.getSeconds()}`.slice(-2));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
