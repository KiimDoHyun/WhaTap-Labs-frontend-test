import { useMemo } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import { dateType } from "../../types/common";
import DatePickerTitle from "./DatePicker/DatePickerTitle";
import ListPicker from "./DatePicker/ListPicker";

interface PropsType {
    date: dateType;
    setDate: React.Dispatch<React.SetStateAction<dateType>>;
    type: string;
}

const DatePicker = ({ date, setDate, type }: PropsType) => {
    const value = useMemo(
        () => new Date(`${date.year}-${date.month}-${date.date}`),
        [date]
    );

    const onChangeCalendar = (e: string | number | Date) => {
        const selected = new Date(e);
        setDate({
            ...date,
            year: selected.getFullYear(),
            month: `0${selected.getMonth() + 1}`.slice(-2),
            date: `0${selected.getDate()}`.slice(-2),
        });
    };

    return (
        <DatePickerBlock>
            <DatePickerTitle type={type} date={date} />

            <DatePickerBodyBlock>
                {/* 날짜 */}
                <Calendar
                    calendarType={"US"}
                    value={value}
                    onChange={onChangeCalendar}
                />
                {/* 00 ~ 23 */}
                <ListPicker
                    num={24}
                    value={Number(date.hour)}
                    type={"hour"}
                    setValue={setDate}
                />

                {/* 00 ~ 59 */}
                <ListPicker
                    num={60}
                    value={Number(date.min)}
                    type={"min"}
                    setValue={setDate}
                />
            </DatePickerBodyBlock>
        </DatePickerBlock>
    );
};

const DatePickerBlock = styled.div`
    .titleArea {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    .bodyArea {
    }
`;

const DatePickerBodyBlock = styled.div`
    position: relative;
    display: flex;
    height: 300px;
`;
export default DatePicker;
