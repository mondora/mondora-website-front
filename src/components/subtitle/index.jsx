import styled from "styled-components";
import PropTypes from "prop-types";

const Subtitle = styled.div`
    color: ${props =>
        props.light ? "var(--white)" : "var(--variant - black)"};
    margin: ${props => props.theme.spacing.unit * 2}px 0;
    font-size: ${props => props.theme.spacing.unit * 4}pt;
`;

Subtitle.propTypes = {
    light: PropTypes.bool
};

export default Subtitle;
