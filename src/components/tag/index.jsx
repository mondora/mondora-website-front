import PropTypes from "prop-types";

import styled from "styled-components";

const THEMES = {
    gray: "gray",
    primary: "primary"
};

const Tag = styled.button`
    background-color: ${props =>
        props.theme === THEMES.gray ? `var(--gray)` : `var(--primary)`};
    width: fit-content;
    float: left;
    padding: 2px 12px;
    margin: 0 8px 8px 0;
    line-height: 1.5em;
    color: var(--text-dark-black);
    border-radius: 24px;
    font-size: 14px;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.5s ease;

    &:disabled {
        cursor: auto;
    }
`;

Tag.propTypes = {
    theme: PropTypes.oneOf([THEMES.gray, THEMES.primary])
};

Tag.defaultProps = {
    theme: THEMES.primary
};

export default Tag;
