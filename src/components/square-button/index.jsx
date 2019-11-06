import React from "react";
import styled, { css } from "styled-components";
import { Link } from "gatsby";

const mixin = css`
    border-color: var(--primary);
    background-color: var(--primary);
    text-align: center;
    text-decoration: none;
    padding: 8px 16px;
    font-size: 16px;
    color: var(--black);
`;

const StyledAnchor = styled.a`
    ${mixin}
`;

const StyledLink = styled(Link)`
    ${mixin}
`;

const StyledButton = styled.button`
    ${mixin}
`;

const SquareButton = props => {
    const { externalLink, internalLink } = props;
    if (internalLink) {
        return <StyledLink to={internalLink} {...props} />;
    } else if (externalLink) {
        return (
            <StyledAnchor
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            />
        );
    }
    return <StyledButton {...props} />;
};

export default SquareButton;
