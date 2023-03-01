import React from "react";
import styled from "styled-components";

interface ListPickerPropType {
    num: number;
    value: number;
    type: string;
    setValue: React.Dispatch<
        React.SetStateAction<{
            year: number;
            month: number;
            date: number;
            hour: number;
            min: number;
        }>
    >;
}

const ListPicker = ({ num, value, type, setValue }: ListPickerPropType) => {
    const onClickList = (input: number) => {
        setValue((prev) => ({
            ...prev,
            [type]: input,
        }));
    };
    return (
        <ListPickerBlock>
            <ul
                style={{
                    listStyle: "none",
                }}
            >
                {new Array(num).fill(0).map((_, idx) => (
                    <li
                        key={idx}
                        className={idx === value ? "selected" : ""}
                        onClick={() => onClickList(idx)}
                    >
                        {idx}
                    </li>
                ))}
            </ul>
        </ListPickerBlock>
    );
};

const ListPickerBlock = styled.div`
    height: 100%;
    overflow-y: scroll;

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
export default ListPicker;
