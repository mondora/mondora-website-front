import PropTypes from "prop-types";

import styled, { css } from "styled-components";

const Subtitle = styled.span`
    font-size: calc(14px + 0.15vw);
    margin: 4px 0;
    color: var(--text-gray);
    line-height: 1.7;

    ${props =>
        props.light &&
        css`
            color: var(--white);
        `}
`;

Subtitle.propTypes = {
    light: PropTypes.bool
};

export default Subtitle;
