import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Hidden = styled.div`
    width: 100%;
    ${props =>
        props.xsUp &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.xs}px) {
                display: none;
            }
        `}
    ${props =>
        props.xsDown &&
        css`
            @media (max-width: ${props => props.theme.breakpoints.xs}px) {
                display: none;
            }
        `}
    ${props =>
        props.smUp &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.sm}px) {
                display: none;
            }
        `}
    ${props =>
        props.smDown &&
        css`
            @media (max-width: ${props => props.theme.breakpoints.sm}px) {
                display: none;
            }
        `}
    ${props =>
        props.mdUp &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.md}px) {
                display: none;
            }
        `}
    ${props =>
        props.mdDown &&
        css`
            @media (max-width: ${props => props.theme.breakpoints.md}px) {
                display: none;
            }
        `}
    ${props =>
        props.lgUp &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.lg}px) {
                display: none;
            }
        `}
    ${props =>
        props.lgDown &&
        css`
            @media (max-width: ${props => props.theme.breakpoints.lg}px) {
                display: none;
            }
        `}
    ${props =>
        props.xlDown &&
        css`
            @media (max-width: ${props => props.theme.breakpoints.xl}px) {
                display: none;
            }
        `};
`;

Hidden.propTypes = {
    xsUp: PropTypes.bool,
    smUp: PropTypes.bool,
    smDown: PropTypes.bool,
    mdUp: PropTypes.bool,
    mdDown: PropTypes.bool,
    lgUp: PropTypes.bool,
    lgDown: PropTypes.bool,
    xlDown: PropTypes.bool
};

export default Hidden;
