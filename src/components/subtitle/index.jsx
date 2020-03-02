import PropTypes from "prop-types";

import styled, { css } from "styled-components";

const Subtitle = styled.div`
    font-size: calc(14px + 0.15vw);
    margin: 4px 0;
    color: var(--text-gray);
    line-height: 1.7;
    ${props => props.center[1] && "text-align: center;"}

    ${props =>
        props.light &&
        css`
            color: var(--white);
        `}
    @media (max-width: 768px){
        ${props => props.center[0] && "text-align: center;"}
    }
`;

Subtitle.defaultProps = {
    center: [false, false]
}

Subtitle.propTypes = {
    light: PropTypes.bool,
    center: PropTypes.array,
};


export default Subtitle;
