import React from "react";
import PropTypes from "prop-types";

const Resource = ({ data }) => (
    <h3>{data.title}</h3>
);

Resource.propTypes = {
    data: PropTypes.object
};

export default Resource;
