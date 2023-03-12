import styled from "styled-components";

export const PickerAreaBlock = styled.div`
    display: flex;
    align-items: center;

    border-bottom: 1px solid #ffffff;

    :hover {
        border-bottom: 1px solid black;
    }
`;

export const PickerBoxBlock = styled.div<{ isActive: boolean }>`
    position: absolute;
    top: 35px;
    right: 0;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 0px 12px 0px darkgrey;

    display: ${({ isActive }) => (isActive ? "block" : "none")};
`;
