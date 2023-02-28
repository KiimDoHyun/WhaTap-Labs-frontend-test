import React from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";

const DatePicker = () => {
    return (
        <DatePickerBlock>
            {/* 날짜 */}
            <Calendar calendarType={"US"} />
            {/* 00 ~ 23 */}
            <div
                style={{
                    height: "100%",
                    overflowY: "scroll",
                }}
            >
                <ul
                    style={{
                        listStyle: "none",
                    }}
                >
                    {new Array(24).fill(0).map((_, idx) => (
                        <li>{idx}</li>
                    ))}
                </ul>
            </div>
            {/* 00 ~ 59 */}
            <div
                style={{
                    height: "100%",
                    overflowY: "scroll",
                }}
            >
                <ul
                    style={{
                        listStyle: "none",
                    }}
                >
                    {new Array(60).fill(0).map((_, idx) => (
                        <li>{idx}</li>
                    ))}
                </ul>
            </div>
        </DatePickerBlock>
    );
};

const DatePickerBlock = styled.div`
    position: relative;
    height: 300px;
    display: flex;
`;
export default DatePicker;
