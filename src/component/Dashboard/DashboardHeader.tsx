import { useContext, useState } from "react";
import styled from "styled-components";
import DatePicker from "../common/DatePicker";
import DateBox from "./DashboardHeader/DateBox";
import RealTime from "./DashboardHeader/RealTime";

import play from "../../asset/image/play.png";
import pause from "../../asset/image/pause.png";
import CurrentTime from "./DashboardHeader/CurrentTime";
import { createDateObj } from "../../common/date";
import { callApiObjectType } from "../../types/widget";
import { DashboardContext } from "../../store/DashboardProvider";

const realTimeList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const DashboardHeader = () => {
    const [callApiObject, setCallApiObject] = useContext(DashboardContext);

    // 구간선택 / 실시간 조회 범위 컴포넌트 활성화 제어 변수
    const [isActiveDatePicker, setIsActiveDatePicker] = useState(false);
    const [isActiveRealTimeList, setIsActiveRealTimeList] = useState(false);

    // 선택된 시간 (최종 적용은 확인 버튼이후)
    const [tempStartDate, setTempStartDate] = useState(
        createDateObj(
            new Date(Date.now() - 1000 * 60 * callApiObject.nowBody.range)
        )
    );
    const [tempEndDate, setTempEndDate] = useState(
        createDateObj(new Date(Date.now()))
    );

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

    // DatePicker 활성화 여부 toggle
    const toggleIsActiveDatePicker = () => {
        setIsActiveDatePicker(!isActiveDatePicker);
    };

    // 실시간 조회 범위 선택 리스트 활성화 여부 toggle
    const toggleIsActiveRealTimeList = () => {
        setIsActiveRealTimeList(!isActiveRealTimeList);
    };

    // 선택된 구간 적용 확인 클릭 이벤트
    const onClickConfirm = () => {
        if (window.confirm("조회 범위를 변경하시겠습니까?")) {
            setCallApiObject((callApiObject: callApiObjectType) => ({
                ...callApiObject,
                status: "PAST",
                pastBody: {
                    startDate: tempStartDate,
                    endDate: tempEndDate,
                },
            }));

            toggleIsActiveDatePicker();
        }
    };

    // 실시간 조회 리스트 아이템 클릭 이벤트
    const onClickRealTimeList = (input: number) => {
        // 실시간 리스트 비활성화
        toggleIsActiveRealTimeList();

        // 실시간 조회 범위 갱신
        setCallApiObject((callApiObject: callApiObjectType) => ({
            ...callApiObject,
            status: "NOW",
            nowBody: {
                range: input,
            },
        }));
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
                    <>
                        <DateBoxBlock onClick={toggleIsActiveDatePicker}>
                            <DateBox
                                dateInfo={callApiObject.pastBody.startDate}
                            />
                            ~
                            <DateBox
                                dateInfo={callApiObject.pastBody.endDate}
                            />
                        </DateBoxBlock>
                    </>
                )}
                <RealTimeBlock onClick={toggleIsActiveRealTimeList}>
                    <RealTime selectedRealTime={callApiObject.nowBody.range} />
                </RealTimeBlock>
            </TitleBlock>

            <DatePickerBlock isActiveDatePicker={isActiveDatePicker}>
                <div className="pickArea">
                    <DatePicker
                        date={tempStartDate}
                        setDate={setTempStartDate}
                        type={"start"}
                    />
                    <DatePicker
                        date={tempEndDate}
                        setDate={setTempEndDate}
                        type={"end"}
                    />
                </div>
                <div className="buttonArea">
                    <button onClick={toggleIsActiveDatePicker}>닫기</button>
                    <button onClick={onClickConfirm}>확인</button>
                </div>
            </DatePickerBlock>

            <RealTimePickerblock isActiveRealTimeList={isActiveRealTimeList}>
                <ul>
                    {realTimeList.map((item: number) => (
                        <li
                            key={item}
                            onClick={() => onClickRealTimeList(item)}
                            className={
                                item === callApiObject.nowBody.range
                                    ? "selected"
                                    : ""
                            }
                        >
                            {item} 분
                        </li>
                    ))}
                </ul>
            </RealTimePickerblock>
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

const DateBoxBlock = styled.div`
    display: flex;
    gap: 10px;

    border-bottom: 1px solid #ffffff;

    :hover {
        border-bottom: 1px solid black;
    }
`;

const RealTimeBlock = styled.div`
    display: flex;
    align-items: center;

    border-bottom: 1px solid #ffffff;

    :hover {
        border-bottom: 1px solid black;
    }
`;

const DatePickerBlock = styled.div<{ isActiveDatePicker: boolean }>`
    position: absolute;
    top: 35px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 0px 12px 0px darkgrey;

    display: ${({ isActiveDatePicker }) =>
        isActiveDatePicker ? "block" : "none"};

    .buttonArea,
    .pickArea {
        display: flex;
    }

    .buttonArea {
        margin-top: 10px;
        justify-content: flex-end;
    }
`;

const RealTimePickerblock = styled.div<{ isActiveRealTimeList: boolean }>`
    position: absolute;
    top: 35px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 0px 12px 0px darkgrey;

    display: ${({ isActiveRealTimeList }) =>
        isActiveRealTimeList ? "block" : "none"};

    ul {
        list-style: none;
        padding: 0;
        width: 50px;

        li {
            cursor: pointer;
            text-align: center;
            transition: 0.3s;
        }

        li:hover {
            background-color: rgba(41, 108, 242, 0.1);
        }

        .selected {
            background-color: rgba(41, 108, 242, 0.1) !important;
            color: rgb(41, 108, 242) !important;
            font-wdight: bold !important;
        }
    }
`;

export default DashboardHeader;
