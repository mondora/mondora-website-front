import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import Underline from "../../images/separator.svg";

const DividerSwirl = styled.img`
    width: ${props => props.width};
    margin: ${props => props.margin};
`;

const Swirl = ({ width = "40%", margin = "" }) => {
    return (
        <DividerSwirl width={width} margin={margin} src={Underline} alt={""} />
    );
};

Swirl.propTypes = {
    width: PropTypes.string,
    margin: PropTypes.string
};

export default Swirl;
