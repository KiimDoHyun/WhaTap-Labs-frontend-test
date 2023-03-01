// DatePicker
interface dateType {
    year: number;
    month: number;
    date: number;
    hour: number;
    min: number;
}

export interface DatePickerPropsType {
    date: dateType;
    setDate: React.Dispatch<React.SetStateAction<dateType>>;
}

export interface ListPickerPropsType {
    num: number;
    value: number;
    type: string;
    setValue: React.Dispatch<React.SetStateAction<dateType>>;
}
