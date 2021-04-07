import React from "react";
import PropTypes from "prop-types";

import Title from "../../../title";
import Subtitle from "../../../subtitle";

const KeepInTouch = ({ header, description }) => {
    return (
        <>
            <Title>{header}</Title>
            <Subtitle margin="32px 0">{description}</Subtitle>
        </>
    );
};

KeepInTouch.propTypes = {
    header: PropTypes.string,
    description: PropTypes.string
};

export default KeepInTouch;
