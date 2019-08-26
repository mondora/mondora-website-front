import React from "react";

import styled, { css } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 2px;
`;

const Line = styled.div`
    width: 2px;
    height: calc(100% - 32px);
    background-color: var(--black);
`;

const Circle = styled.div`
    display: none;

    ${props =>
        props.show &&
        css`
            display: block;
            border: 2px solid var(--black);
            height: 16px;
            width: 16px;
            border-radius: 16px;
        `}
`;

const Divider = ({ above = false, below = true }) => {
    return (
        <Container>
            <Circle show={above} />
            <Line />
            <Circle show={below} />
        </Container>
    );
};

export default Divider;
