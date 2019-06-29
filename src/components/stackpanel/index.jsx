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
                margin-right: ${props => props.gutter}px;
            `}

        ${props =>
            props.direction === "column" &&
            css`
                margin-bottom: ${props => props.gutter}px;
            `}
    }

    & > :last-child {
        margin: 0;
    }
`;

const StackPanel = ({
    children,
    direction = "row",
    padding = 0,
    gutter = 0,
    justify = "start",
    style = {},
    ...rest
}) => (
    <Container
        style={style}
        direction={direction}
        padding={padding}
        gutter={gutter}
        justify={justify}
        {...rest}
    >
        {children}
    </Container>
);

export default StackPanel;
