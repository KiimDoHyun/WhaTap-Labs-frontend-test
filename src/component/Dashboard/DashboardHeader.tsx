import { useContext } from "react";
import styled from "styled-components";
import play from "../../asset/image/play.png";
import pause from "../../asset/image/pause.png";
import CurrentTime from "./DashboardHeader/CurrentTime";
import { DashboardContext } from "../../store/DashboardProvider";
import DatePickerArea from "./DashboardHeader/DatePickerArea";
import SelectRealTimeRangeArea from "./DashboardHeader/SelectRealTimeRangeArea";

const DashboardHeader = () => {
    const [callApiObject, setCallApiObject] = useContext(DashboardContext);

    // callApiObject status toggle
    const toggleCallApiObject = () => {
        setCallApiObject((callApiObject: any) => {
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
            <TitleBlock>
                <div onClick={toggleCallApiObject}>
                    <img
                        style={{ width: "20px", height: "20px" }}
                        src={callApiObject.status === "NOW" ? pause : play}
                        alt={"icon"}
                    />
                </div>
                {callApiObject.status === "NOW" ? (
                    <CurrentTime onClick={toggleCallApiObject} />
                ) : (
                    <DatePickerArea />
                )}

                <SelectRealTimeRangeArea />
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

export const PickerAreaBlock = styled.div`
    display: flex;
    align-items: center;

    border-bottom: 1px solid #ffffff;

    :hover {
        border-bottom: 1px solid black;
    }
`;

export const PickerBoxBlock = styled.div<{ isActive: boolean }>`
    position: absolute;
    top: 35px;
    right: 0;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 0px 12px 0px darkgrey;

    display: ${({ isActive }) => (isActive ? "block" : "none")};
`;

export default DashboardHeader;
