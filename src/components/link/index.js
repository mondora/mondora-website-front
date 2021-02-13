import React from "react";
import PropTypes from "prop-types";

import { Link as GatsbyLink } from "gatsby";

const Link = ({ children, to, activeClassName, partiallyActive, ...rest }) => {
    const internal = /^\/(?!\/)/.test(to);

    if (internal) {
        return (
            <GatsbyLink
                to={to}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                {...rest}
            >
                {children}
            </GatsbyLink>
        );
    }
    return (
        <a href={to} rel="noopener noreferrer" {...rest}>
            {children}
        </a>
    );
};

Link.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    activeClassName: PropTypes.string,
    partiallyActive: PropTypes.string
};

export default Link;
