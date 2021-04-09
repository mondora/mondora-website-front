import PropTypes from "prop-types";

import styled from "styled-components";

const RoundButton = styled.button`
    background-color: ${props =>
        props.theme === grayTheme ? `var(--gray)` : `var(--primary-hover)`};
    width: fit-content;
    float: left;
    padding: 2px 12px;
    margin: 4px;
    line-height: 1.5;
    color: var(--text-dark-black);
    border-radius: 24px;
    font-size: 12px;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.5s ease;
    &:disabled {
        cursor: auto;
    }
`;

const grayTheme = "gray";
const yellowTheme = "yellow";

RoundButton.propTypes = {
    theme: PropTypes.oneOf([grayTheme, yellowTheme])
};

RoundButton.defaultProps = {
    theme: yellowTheme
};

export default RoundButton;
