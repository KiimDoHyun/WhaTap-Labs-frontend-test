import { SelectRealTimeListItemBlock } from "../../Dashboard/CommonStyle";

interface ListPickerItemPropsType {
    onClick: (input: number) => void;
    idx: number;
    value: number;
}

const ListPickerItem = ({ onClick, idx, value }: ListPickerItemPropsType) => {
    return (
        <SelectRealTimeListItemBlock
            onClick={() => onClick(idx)}
            isSelcted={Number(idx) === Number(value)}
        >
            {idx}
        </SelectRealTimeListItemBlock>
    );
};

export default ListPickerItem;
