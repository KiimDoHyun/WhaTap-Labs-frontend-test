import React from "react";
import styled from "styled-components";
import play from "../../../asset/image/play.png";
import pause from "../../../asset/image/pause.png";

interface PlayIconPropsType {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    status: string;
}

const PlayIcon = ({ onClick, status }: PlayIconPropsType) => {
    return (
        <PlayIconBlock onClick={onClick}>
            <PlayIconImage src={status === "NOW" ? pause : play} alt={"icon"} />
        </PlayIconBlock>
    );
};

const PlayIconBlock = styled.div`
    display: flex;
    align-items: center;
`;
const PlayIconImage = styled.img`
    width: 20px;
    height: 20px;
`;
export default PlayIcon;
