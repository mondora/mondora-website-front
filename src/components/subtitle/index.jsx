import PropTypes from "prop-types";

import styled from "styled-components";

const Subtitle = styled.div`
    font-size: calc(14px + 0.15vw);
    margin: ${props => (props.margin ? props.margin : "4px 0")};
    color: ${props =>
        props.variant
            ? props.variant === light
                ? "var(--white)"
                : "var(--text-dark-black)"
            : "var(--text-gray)"};
    line-height: ${props => props.spacing};
    ${props => props.center[1] && "text-align: center;"}

    @media (max-width: 768px) {
        ${props => props.center[0] && "text-align: center;"}
    } ;
`;

const light = "light";
const dark = "dark";

Subtitle.defaultProps = {
    center: [false, false],
    spacing: "1.7"
};

Subtitle.propTypes = {
    variant: PropTypes.oneOf([light, dark, ""]),
    center: PropTypes.array,
    margin: PropTypes.string,
    spacing: PropTypes.string
};

export default Subtitle;
