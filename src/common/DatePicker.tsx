import { useMemo } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import { DatePickerPropsType } from "../types/datePicker";
import ListPicker from "./DatePicker/ListPicker";

const DatePicker = ({ date, setDate }: DatePickerPropsType) => {
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
            <div className="titleArea">
                {`${date.year}/${date.month}/${date.date} ${date.hour}:${date.min}`}
            </div>
            <div className="bodyArea">
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
            </div>
        </DatePickerBlock>
    );
};

const DatePickerBlock = styled.div`
    .titleArea {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bodyArea {
        position: relative;
        display: flex;
        height: 300px;
    }
`;
export default DatePicker;
