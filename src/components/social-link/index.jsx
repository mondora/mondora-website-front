import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RadiusIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => (props.type === "dark" ? "white" : "black")};
    background-color: ${props => (props.type === "dark" ? "black" : "white")};
    padding: 8px;
    margin: 8px;
    border-radius: ${props => (props.text ? "24px" : "50%")};
    font-size: 24px;
    height: 32px;
    width: ${props => (props.text ? "auto" : "32px")};
`;

const SocialName = styled.div`
    margin-left: 8px;
`;

const LinkContainer = styled.a`
    text-decoration: none;
`;

const SocialLink = ({ type, text, url, icon }) => (
    <LinkContainer href={url}>
        <RadiusIcon type={type} text={text}>
            <FontAwesomeIcon icon={icon} />
            {text && <SocialName>{text}</SocialName>}
        </RadiusIcon>
    </LinkContainer>
);
SocialLink.propTypes = {
    type: PropTypes.oneOf(["dark", "light"]),
    text: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.string
};

export default SocialLink;
