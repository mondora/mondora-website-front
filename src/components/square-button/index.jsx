import PropTypes from "prop-types";

import styled, { css } from "styled-components";

const SquareButton = styled.button`
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

const lightTheme = "light";
const yellowTheme = "primary";

SquareButton.propTypes = {
    theme: PropTypes.oneOf([lightTheme, yellowTheme])
};

SquareButton.defaultProps = {
    theme: yellowTheme
};

export default SquareButton;
