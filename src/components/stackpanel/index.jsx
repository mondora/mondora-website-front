import React from "react";

import styled, { css } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    padding: ${props => `${props.padding}px`};

    & > * {
        ${props =>
            props.direction === "row" &&
            css`
                margin-left: ${props => props.gutter}px;
            `}

        ${props =>
            props.direction === "column" &&
            css`
                margin-bottom: ${props => props.gutter}px;
            `}
    }

    & > :first-child {
        margin: initial !important;
    }
`;

const StackPanel = ({
    children,
    direction = "row",
    padding = 8,
    gutter = 8,
    justify = "start",
    style = {}
}) => (
    <Container
        style={style}
        direction={direction}
        padding={padding}
        gutter={gutter}
        justify={justify}
    >
        {children}
    </Container>
);

export default StackPanel;
