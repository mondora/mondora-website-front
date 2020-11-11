import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: ${(props) => props.height};
    margin: 0 16px;

    @media (max-width: 768px) {
        display: ${(props) => props.hideOnMobile && "none"};
    }
`;

export const Line = styled.div`
    width: 2px;
    height: calc(100% - 15px);
    background-color: var(--black);
`;

export const Circle = styled.div`
    display: none;

    ${(props) =>
        props.show &&
        css`
            display: block;
            border: 2px solid var(--black);
            height: ${(props) => props.theme.spacing.unit * 3}px;
            width: ${(props) => props.theme.spacing.unit * 3}px;
            border-radius: ${(props) => props.theme.spacing.unit * 4}px;
        `}
`;
