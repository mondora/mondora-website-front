import React from "react";
import PropTypes from "prop-types";

const Content = ({ html, ...rest }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} {...rest} />
);

Content.propTypes = {
    html: PropTypes.string.isRequired
};

export default Content;
