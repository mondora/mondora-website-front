import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Hidden = styled.div`
    width: 100%;

    ${props =>
        props.xsUp &&
        css`
            @media (min-width: ${props => props.theme.breakpoints[0]}px) {
                display: none;
            }
        `}
    ${props =>
        props.xsDown &&
        css`
            @media (max-width: ${props => props.theme.breakpoints[0] - 1}px) {
                display: none;
            }
        `}
    ${props =>
        props.smUp &&
        css`
            @media (min-width: ${props => props.theme.breakpoints[1]}px) {
                display: none;
            }
        `}
    ${props =>
        props.smDown &&
        css`
            @media (max-width: ${props => props.theme.breakpoints[1] - 1}px) {
                display: none;
            }
        `}
    ${props =>
        props.lgUp &&
        css`
            @media (min-width: ${props => props.theme.breakpoints[2]}px) {
                display: none;
            }
        `}
    ${props =>
        props.lgDown &&
        css`
            @media (max-width: ${props => props.theme.breakpoints[2] - 1}px) {
                display: none;
            }
        `}
`;

Hidden.propTypes = {
    xsUp: PropTypes.bool,
    xsDown: PropTypes.bool,
    smUp: PropTypes.bool,
    smDown: PropTypes.bool,
    lgUp: PropTypes.bool,
    lgDown: PropTypes.bool
};

export default Hidden;
