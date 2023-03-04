// DatePicker
interface dateType {
    year: number;
    month: string;
    date: string;
    hour: string;
    min: string;
    sec: string;
}

export interface DatePickerPropsType {
    date: dateType;
    setDate: React.Dispatch<React.SetStateAction<dateType>>;
    type: string;
}

export interface ListPickerPropsType {
    num: number;
    value: number | string;
    type: string;
    setValue: React.Dispatch<React.SetStateAction<dateType>>;
}
