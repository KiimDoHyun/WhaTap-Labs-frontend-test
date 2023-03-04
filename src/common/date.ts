import { dateType } from "../types/widget";

// Date 객체 생성
export const createDateObj = (date: Date) => {
    return {
        year: date.getFullYear(),
        month: `0${date.getMonth() + 1}`.slice(-2),
        date: `0${date.getDate()}`.slice(-2),
        hour: `0${date.getHours()}`.slice(-2),
        min: `0${date.getMinutes()}`.slice(-2),
        sec: `0${date.getSeconds()}`.slice(-2),
    };
};

// Date 구간 생성
export const getDateRange = (range: number = 10) => {
    const startDate = Date.now() - 1000 * 60 * range;
    const endDate = Date.now();

    return { startDate, endDate };
};

// Date 객체 -> parse
export const parseDate = (dateInfo: dateType) =>
    Date.parse(
        `${dateInfo.year}-${dateInfo.month}-${dateInfo.date}T${dateInfo.hour}:${dateInfo.min}:00`
    );
