import styled from "styled-components";

const SquareButton = styled.button`
    border-color: var(--primary);
    background-color: var(--primary);
    text-align: center;
    text-decoration: none;
    padding: 8px 16px;
    font-size: 16px;
    color: var(--black);
    cursor: pointer;
    transition: all 0.5s ease;
   
    &:hover {
        background-color: var(--primary-hover);
    }
`;

export default SquareButton;
