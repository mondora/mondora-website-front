import React from "react";

import styled, { css } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: ${props => props.height};

    @media (max-width: 768px) {
        height: 70px;
        display: ${props => props.hideOnMobile && "none"};
    }
`;

const Line = styled.div`
    width: 2px;
    height: calc(100% - 15px);
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

const Divider = ({
    above = false,
    below = true,
    height = "100%",
    hideOnMobile = false
}) => {
    return (
        <Container height={height} hideOnMobile={hideOnMobile}>
            <Circle show={above} />
            <Line />
            <Circle show={below} />
        </Container>
    );
};

export default Divider;
