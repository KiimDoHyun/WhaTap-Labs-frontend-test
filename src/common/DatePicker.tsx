import React, { useEffect, useMemo, useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import ListPicker from "./DatePicker/ListPicker";

const DatePicker = ({ date, setDate }: any) => {
    const value = useMemo(
        () => new Date(`${date.year}-${date.month}-${date.date}`),
        [date]
    );

    const onChangeCalendar = (e: string | number | Date) => {
        const selected = new Date(e);
        setDate({
            ...date,
            year: selected.getFullYear(),
            month: selected.getMonth() + 1,
            date: selected.getDate(),
        });
    };

    return (
        <DatePickerBlock>
            {/* 날짜 */}
            <Calendar
                calendarType={"US"}
                value={value}
                onChange={onChangeCalendar}
            />
            {/* 00 ~ 23 */}
            <ListPicker
                num={24}
                value={date.hour}
                type={"hour"}
                setValue={setDate}
            />

            {/* 00 ~ 59 */}
            <ListPicker
                num={60}
                value={date.min}
                type={"min"}
                setValue={setDate}
            />
        </DatePickerBlock>
    );
};

const DatePickerBlock = styled.div`
    position: relative;
    height: 300px;
    display: flex;
`;
export default DatePicker;
