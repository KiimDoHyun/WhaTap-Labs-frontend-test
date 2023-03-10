import styled from "styled-components";
import { ListPickerPropsType } from "../../../types/datePicker";
import ListPickerItem from "./ListPickerItem";

const ListPicker = ({ num, value, type, setValue }: ListPickerPropsType) => {
    const onClickList = (input: number) => {
        setValue((prev) => ({
            ...prev,
            [type]: `0${input}`.slice(-2),
        }));
    };
    return (
        <ListPickerBlock>
            <ListPickerUl>
                {new Array(num).fill(0).map((_, idx) => (
                    <ListPickerItem
                        key={idx}
                        onClick={onClickList}
                        idx={idx}
                        value={value}
                    />
                ))}
            </ListPickerUl>
        </ListPickerBlock>
    );
};

const ListPickerUl = styled.ul`
    list-style: none;
    padding: 0;
    width: 50px;
`;
const ListPickerBlock = styled.div`
    height: 100%;
    overflow-y: scroll;
`;
export default ListPicker;
