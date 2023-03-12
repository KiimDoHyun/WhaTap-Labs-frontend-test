import styled from "styled-components";

const selectedStyle = `
background-color: rgba(41, 108, 242, 0.1) !important;
color: rgb(41, 108, 242) !important;
font-wdight: bold !important;
`;

export const ListItemBlock = styled.li<{ isSelcted: Boolean }>`
    cursor: pointer;
    text-align: center;
    transition: 0.3s;

    :hover {
        background-color: rgba(41, 108, 242, 0.1);
    }

    ${({ isSelcted }) => (isSelcted ? selectedStyle : "")}
`;
