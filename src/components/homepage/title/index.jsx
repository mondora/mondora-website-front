import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h1`
    font-size: ${props => props.theme.spacing.unit * 6}pt;
    font-weight: bold;
    color: ${props => (props.light ? `var(--white)` : `var(--black)`)};
`;

Title.propTypes = {
    light: PropTypes.boolean
};

Title.defaultProps = {
    light: false
};

export default Title;
