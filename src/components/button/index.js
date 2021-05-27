import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Link from "../link";

const SIZES = {
    small: "small",
    medium: "medium"
};

const THEMES = {
    light: "light",
    primary: "primary"
};

const StyledButton = styled.button`
    text-align: center;
    text-decoration: none;
    width: fit-content;
    border-radius: 2px;
    overflow: visible;
    transition: all 0.5s ease;
    cursor: pointer;

    ${({ size }) =>
        size === SIZES.small
            ? css`
                  padding: 4px 8px;
                  font-size: 14px;
              `
            : css`
                  padding: 8px 24px;
                  font-size: 16px;
              `}

    ${({ theme }) =>
        theme === THEMES.light
            ? css`
                  background: var(--white);
                  color: var(--text-dark-black);
                  border: 1px solid var(--text-dark-black);

                  &:hover {
                      color: var(--white);
                      background: var(--text-dark-black);
                      border: 1px solid var(--text-dark-black);
                  }
              `
            : css`
                  background: var(--primary);
                  color: var(--text-dark-black);
                  border: 1px solid var(--primary);

                  &:hover {
                      background: var(--text-dark-black);
                      color: var(--white);
                      border: 1px solid var(--white);
                  }
              `}

    &:disabled {
        background: var(--background-light-gray);
        color: var(--text-gray);
        border: 1px solid var(--background-light-gray);
        cursor: not-allowed;
    }
`;

const Button = ({ children, disabled, onClick, size, theme, to, ...rest }) => (
    <StyledButton
        as={to ? Link : "button"}
        disabled={disabled}
        onClick={onClick}
        size={size}
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
    size: PropTypes.oneOf([SIZES.medium, SIZES.small]),
    theme: PropTypes.oneOf([THEMES.light, THEMES.primary]),
    to: PropTypes.any
};

Button.defaultProps = {
    theme: THEMES.primary
};

export default Button;
