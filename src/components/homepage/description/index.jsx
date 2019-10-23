import styled from "styled-components";
import PropTypes from "prop-types";

const Description = styled.div`
    color: ${props => (props.light ? `var(--white)` : `var(--black)`)};
    font-size: ${props => props.theme.spacing.unit * 4}pt;
`;

Description.propTypes = {
    light: PropTypes.boolean
};

Description.defaultProps = {
    light: false
};

export default Description;
