import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Link as GatsbyLink } from "gatsby";

const StyledLink = styled.a`
    color: var(--text-gray);

    &:hover {
        color: var(--text-dark-black);
    }
`;

const Link = ({ children, to, activeClassName, partiallyActive, ...rest }) => {
    const internal = /^\/(?!\/)/.test(to);

    if (internal) {
        return (
            <StyledLink
                as={GatsbyLink}
                to={to}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                {...rest}
            >
                {children}
            </StyledLink>
        );
    }
    return (
        <StyledLink href={to} rel="noopener noreferrer" {...rest}>
            {children}
        </StyledLink>
    );
};

Link.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    activeClassName: PropTypes.string,
    partiallyActive: PropTypes.string
};

export default Link;
