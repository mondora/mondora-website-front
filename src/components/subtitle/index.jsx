import PropTypes from "prop-types";

import styled, { css } from "styled-components";

const Subtitle = styled.div`
    font-size: calc(16px + 0.15vw);
    margin: ${props => props.theme.spacing.unit * 2}px 0;
    color: var(--text-gray);

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
