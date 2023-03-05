import styled from "styled-components";

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

const selectedStyle = `
background-color: rgba(41, 108, 242, 0.1) !important;
color: rgb(41, 108, 242) !important;
font-wdight: bold !important;
`;

const SelectRealTimeListItemBlock = styled.li<{ isSelcted: Boolean }>`
    cursor: pointer;
    text-align: center;
    transition: 0.3s;

    :hover {
        background-color: rgba(41, 108, 242, 0.1);
    }

    ${({ isSelcted }) => (isSelcted ? selectedStyle : "")}
`;
export default SelectRealTimeListItem;
