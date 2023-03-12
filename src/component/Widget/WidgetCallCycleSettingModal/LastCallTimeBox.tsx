import styled from "styled-components";

interface PropsType {
    lastCallTime: Date;
}

const LastCallTimeBox = ({ lastCallTime }: PropsType) => {
    return (
        <LastCallTimeBoxBlock>
            마지막호출 시점:{" "}
            {lastCallTime ? lastCallTime.toLocaleString() : "호출 정보 없음"}
        </LastCallTimeBoxBlock>
    );
};

const LastCallTimeBoxBlock = styled.div``;
export default LastCallTimeBox;
