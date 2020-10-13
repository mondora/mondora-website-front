import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h2`
    margin-top: 0;
    font-weight: bold;
    margin: 0;
    color: ${props => {
        if (props.light) {
            return "var(--white)";
        }
        return props.mini ? "#9a9a9a" : "var(--black)";
    }};

    font-size: 26px;
    text-align: ${props => (props.center ? "center" : "inherit")};
`;

Title.propTypes = {
    light: PropTypes.bool,
    mini: PropTypes.bool,
    center: PropTypes.bool
};

export default Title;
