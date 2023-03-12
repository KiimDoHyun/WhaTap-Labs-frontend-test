import { ListItemBlock } from "../../../asset/style/common";

interface SelectRealTimeListItemPropsType {
    range: number;
    onClick: (input: number) => void;
    prevSelectedRange: number;
}

const SelectRealTimeListItem = ({
    range,
    onClick,
    prevSelectedRange,
}: SelectRealTimeListItemPropsType) => {
    return (
        <ListItemBlock
            onClick={() => onClick(range)}
            isSelcted={range === prevSelectedRange}
        >
            {range} 분
        </ListItemBlock>
    );
};

export default SelectRealTimeListItem;
