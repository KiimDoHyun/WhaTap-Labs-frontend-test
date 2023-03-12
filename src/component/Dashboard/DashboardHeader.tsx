import { useContext } from "react";
import styled from "styled-components";
import { DashboardContext } from "../../store/DashboardProvider";
import SelectRealTimeRangeArea from "./DashboardHeader/SelectRealTimeRangeArea";
import PlayIcon from "./DashboardHeader/PlayIcon";
import TimeBlock from "./DashboardHeader/TimeBlock";
import { Button } from "react-bootstrap";
import { WidgetPropsSettingModalSetterContext } from "../../store/WidgetPropsSettingModalProvider";
interface dateType {
    year: number;
    month: string;
    date: string;
    hour: string;
    min: string;
    sec: string;
}

interface callApiObjectType {
    status: string;
    pastBody: {
        startDate: dateType;
        endDate: dateType;
    };
    nowBody: {
        range: number;
    };
}

const DashboardHeader = () => {
    /*
    토글 이벤트,
    이미지, 시간/데이트피커 토글
    */
    const [
        {
            status,
            nowBody: { range },
        },
        setCallApiObject,
    ] = useContext(DashboardContext);
    const { setTrueActiveWidgetSettingModal } = useContext(
        WidgetPropsSettingModalSetterContext
    );

    // callApiObject status toggle
    const toggleCallApiObject = () => {
        setCallApiObject((callApiObject: callApiObjectType) => {
            const { status } = callApiObject;
            if (status === "STOP" || status === "PAST") {
                return { ...callApiObject, status: "NOW" };
            } else {
                return { ...callApiObject, status: "STOP" };
            }
        });
    };

    return (
        <DashboardHeaderBlock>
            <Button onClick={() => setTrueActiveWidgetSettingModal("ADD")}>
                모달 활성화
            </Button>
            <TitleBlock>
                <PlayIcon onClick={toggleCallApiObject} status={status} />

                <TimeBlock onClick={toggleCallApiObject} status={status} />

                <SelectRealTimeRangeArea
                    range={range}
                    setCallApiObject={setCallApiObject}
                />
            </TitleBlock>
        </DashboardHeaderBlock>
    );
};

const DashboardHeaderBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: relative;
    user-select: none;
`;
const TitleBlock = styled.div`
    display: flex;
    gap: 10px;
    border: 1px solid black;
    cursor: pointer;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 12px;
`;

export default DashboardHeader;
