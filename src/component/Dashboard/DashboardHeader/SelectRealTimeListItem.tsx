import { SelectRealTimeListItemBlock } from "../CommonStyle";

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
        <SelectRealTimeListItemBlock
            onClick={() => onClick(range)}
            isSelcted={range === prevSelectedRange}
        >
            {range} 분
        </SelectRealTimeListItemBlock>
    );
};

export default SelectRealTimeListItem;
