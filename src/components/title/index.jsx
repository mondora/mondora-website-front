import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h1`
    font-weight: bold;
    margin: 0;
    color: ${props => {
        if (props.light) {
            return "var(--white)";
        }
        return props.mini ? "#9a9a9a" : "var(--black)";
    }};
    font-size: ${props => {
        const spacingUnit = props.theme.spacing.unit;
        return props.mini ? spacingUnit * 3 : spacingUnit * 5;
    }}pt;
    font-family: ${props =>
        props.mini ? "Source Sans Pro" : "Playfair Display"};
    text-align: ${props => (props.center ? "center" : "inherit")};
`;

Title.propTypes = {
    light: PropTypes.light,
    mini: PropTypes.bool,
    center: PropTypes.bool
};

export default Title;
