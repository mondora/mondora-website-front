import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../styles/theme";

const unit = theme.spacing.unit;

export const Spacer = styled.div`
    margin: ${({ topRatio, rightRatio, bottomRatio, leftRatio }) =>
        `${unit * topRatio}px ${unit * rightRatio}px ${unit *
            bottomRatio}px ${unit * leftRatio}px`};
`;

Spacer.propTypes = {
    topRatio: PropTypes.number.isRequired,
    rightRatio: PropTypes.number.isRequired,
    bottomRatio: PropTypes.number.isRequired,
    leftRatio: PropTypes.number.isRequired
};

Spacer.defaultProps = {
    topRatio: 0,
    rightRatio: 0,
    bottomRatio: 0,
    leftRatio: 0
};
