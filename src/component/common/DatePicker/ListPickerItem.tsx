import { ListItemBlock } from "../../../asset/style/common";

interface ListPickerItemPropsType {
    onClick: (input: number) => void;
    idx: number;
    value: number;
}

const ListPickerItem = ({ onClick, idx, value }: ListPickerItemPropsType) => {
    return (
        <ListItemBlock
            onClick={() => onClick(idx)}
            isSelcted={Number(idx) === Number(value)}
        >
            {idx}
        </ListItemBlock>
    );
};

export default ListPickerItem;
