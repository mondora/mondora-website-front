import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import swirl from "../../images/separator.svg";

const Separator = styled.img`
    margin: ${props => props.margin};
`;

const SwirlSeparator = ({ margin, width }) => (
    <Separator margin={margin} width={width} src={swirl} />
);

SwirlSeparator.propTypes = {
    width: PropTypes.string,
    margin: PropTypes.string
};

SwirlSeparator.defaultProps = {
    width: "80px",
    margin: "8px"
};

export default SwirlSeparator;
