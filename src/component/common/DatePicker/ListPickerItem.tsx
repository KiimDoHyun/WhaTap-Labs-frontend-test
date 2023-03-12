import { ListItemBlock } from "../../../asset/style/common";

interface PropsType {
    onClick: (input: number) => void;
    idx: number;
    value: number;
}

const ListPickerItem = ({ onClick, idx, value }: PropsType) => {
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
