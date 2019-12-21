import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import FeatherIcon from "../feather-icon";

export const SocialName = styled.div`
    font-size: ${props => props.theme.spacing.unit * 3}px;
`;

export const LinkContainer = styled.a`
    cursor: pointer;
    text-decoration: none;
    color: white;
    background: white;
`;

const SocialContainer = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    cursor: pointer;
    padding: 6px;
    text-decoration: none;

    border: 2px solid;
    border-radius: 40px;

    color: var(--black);
    border-color: var(--white);
    background: var(--white);

    &:hover {
        color: var(--white);
        border-color: var(--dark);
        background: var(--dark);
    }

    transition: all ease 0.4s;
`;

const SocialText = styled.span`
    margin: 0 4px;
`;

export const SocialLink = props => (
    <SocialContainer {...props}>
        <FeatherIcon name={props.icon} size={18} />
        {props.text && <SocialText {...props}>{props.text}</SocialText>}
    </SocialContainer>
);

SocialLink.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string
};

SocialLink.defaultProps = {
    type: "light"
};

export default SocialLink;
