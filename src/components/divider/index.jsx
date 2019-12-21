import React from "react";
import PropTypes from "prop-types";

import { Container, Circle, Line } from "./styled";

const Divider = ({
    above = false,
    below = true,
    height = "100%",
    hideOnMobile = false
}) => {
    return (
        <Container height={height} hideOnMobile={hideOnMobile}>
            <Circle show={above} />
            <Line />
            <Circle show={below} />
        </Container>
    );
};

Divider.propTypes = {
    above: PropTypes.bool,
    below: PropTypes.bool,
    height: PropTypes.string,
    hideOnMobile: PropTypes.bool
};

export default Divider;
