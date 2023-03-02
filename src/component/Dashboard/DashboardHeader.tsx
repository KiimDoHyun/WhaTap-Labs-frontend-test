import React, { useState } from "react";
import styled from "styled-components";
import { setStop } from "../..";
import DatePicker from "../../common/DatePicker";
import DateBox from "./DashboardHeader/DateBox";
import RealTime from "./DashboardHeader/RealTime";

import play from "../../asset/image/play.png";
import pause from "../../asset/image/pause.png";

const realTimeList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const DashboardHeader = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isCallRealTime,
    setIsCallRealTime,
}: any) => {
    const [isClickDate, setIsClickDate] = useState(false);
    const [isClickRealTime, setIsClickRealTime] = useState(false);

    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);

    const [selectedRealTime, setSelectedRealTime] = useState(10);

    const [isActiveSelectRange, setIsActiveSelectRange] = useState(false);

    const toggle = () => {
        setIsClickDate(!isClickDate);
    };

    const onClickConfirm = () => {
        if (window.confirm("조회 범위를 변경하시겠습니까?")) {
            setStartDate(tempStartDate);
            setEndDate(tempEndDate);

            setIsCallRealTime(false);

            setSelectedRealTime(null);
        }

        toggle();
    };

    const onClickRealTime = () => {
        setIsClickRealTime(!isClickRealTime);
    };

    const onClickActiveSelectRange = () => {
        // 범위 재 설정 컴포넌트 활성화
        setIsActiveSelectRange((isActiveSelectRange) => {
            if (isActiveSelectRange) {
                // widget 에서 더이상 실시간 호출을 못하도록 정지해야 함.
                setStop(false);
            } else {
                setStop(true);
            }
            return !isActiveSelectRange;
        });
    };

    const onClickRealTimeList = (input: number) => {
        // 실시간 flag : true
        // setFlag = true
        setIsCallRealTime(true);

        //
        // 선택된 항목으로 범위 지정
        // setRange(input)
        const now: Date = new Date(Date.now());
        const start = new Date(Date.now() - 1000 * 60 * input);

        setStartDate({
            year: start.getFullYear(),
            month: `0${start.getMonth() + 1}`.slice(-2),
            date: `0${start.getDate()}`.slice(-2),
            hour: `0${start.getHours()}`.slice(-2),
            min: `0${start.getMinutes()}`.slice(-2),
        });
        setEndDate({
            year: now.getFullYear(),
            month: `0${now.getMonth() + 1}`.slice(-2),
            date: `0${now.getDate()}`.slice(-2),
            hour: `0${now.getHours()}`.slice(-2),
            min: `0${now.getMinutes()}`.slice(-2),
        });
        setSelectedRealTime(input);

        onClickRealTime();
    };
    return (
        <DashboardHeaderBlock>
            <TitleBlock>
                <div
                    onClick={onClickActiveSelectRange}
                    title={
                        isActiveSelectRange
                            ? "실시간 조회를 시작합니다."
                            : "실시간 조회를 정지합니다."
                    }
                >
                    <img
                        style={{ width: "20px", height: "20px" }}
                        src={isActiveSelectRange ? play : pause}
                        alt={"icon"}
                    />
                </div>
                {isActiveSelectRange ? (
                    <>
                        {/* 누르면 실시간 조회 시작 */}
                        <DateBoxBlock
                            onClick={toggle}
                            title="특정 구간 조회 설정"
                        >
                            <DateBox dateInfo={startDate} />
                            ~
                            <DateBox dateInfo={endDate} />
                        </DateBoxBlock>
                    </>
                ) : (
                    <div onClick={onClickActiveSelectRange}>HH:MM:SS</div>
                )}
                <RealTimeBlock
                    title="실시간 조회 설정"
                    onClick={onClickRealTime}
                >
                    <RealTime
                        selectedRealTime={selectedRealTime}
                        isRealTime={isCallRealTime}
                    />
                </RealTimeBlock>
            </TitleBlock>

            <DatePickerBlock isClickDate={isClickDate}>
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
                    <button onClick={toggle}>닫기</button>
                    <button onClick={onClickConfirm}>확인</button>
                </div>
            </DatePickerBlock>

            <RealTimePickerblock isClickRealTime={isClickRealTime}>
                <ul>
                    {realTimeList.map((item: number) => (
                        <li
                            key={item}
                            onClick={() => onClickRealTimeList(item)}
                            className={
                                item === selectedRealTime ? "selected" : ""
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

const DatePickerBlock = styled.div<{ isClickDate: boolean }>`
    position: absolute;
    top: 35px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 0px 12px 0px darkgrey;

    display: ${({ isClickDate }) => (isClickDate ? "block" : "none")};

    .buttonArea,
    .pickArea {
        display: flex;
    }

    .buttonArea {
        margin-top: 10px;
        justify-content: flex-end;
    }
`;

const RealTimePickerblock = styled.div<{ isClickRealTime: boolean }>`
    position: absolute;
    top: 35px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 0px 12px 0px darkgrey;

    display: ${({ isClickRealTime }) => (isClickRealTime ? "block" : "none")};

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
