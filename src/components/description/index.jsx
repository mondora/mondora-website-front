import styled from "styled-components";
import PropTypes from "prop-types";

const Description = styled.p`
    color: ${props => (props.light ? `var(--white)` : `var(--black)`)};
    font-size: ${props => props.theme.spacing.unit * 3}pt;
`;

Description.propTypes = {
    light: PropTypes.bool
};

Description.defaultProps = {
    light: false
};

export default Description;
