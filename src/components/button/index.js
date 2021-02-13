import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Link from "../link";

const lightTheme = "light";
const yellowTheme = "primary";

const StyledButton = styled.button`
    ${props =>
        props.theme === lightTheme
            ? css`
                  background-color: var(--white);
                  border: 1px solid var(--text-dark-black);
              `
            : css`
                  background-color: var(--primary);
              `}

    text-align: center;
    text-decoration: none;
    width: fit-content;
    padding: 8px 16px;
    font-size: 16px;
    color: var(--text-dark-black);
    cursor: pointer;
    transition: all 0.5s ease;

    &:hover {
        background-color: var(--primary-hover);
    }
`;

const Button = ({ children, disabled, onClick, theme, to, ...rest }) => (
    <StyledButton
        as={to ? Link : "button"}
        disabled={disabled}
        onClick={onClick}
        theme={theme}
        to={to}
        {...rest}
    >
        {children}
    </StyledButton>
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    theme: PropTypes.oneOf([lightTheme, yellowTheme]),
    to: PropTypes.any
};

Button.defaultProps = {
    theme: yellowTheme
};

export default Button;
