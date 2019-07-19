import React from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StackPanel from "../stackpanel";

const RadiusIcon = styled(StackPanel)`
    font-size: 24px;
    min-width: 24px;
    height: 24px;
    border-radius: 24px;
`;

const WhiteRadiusIcon = styled(RadiusIcon)`
    color: var(--black);
    background-color: var(--white);
`;

const DarkRadiusIcon = styled(RadiusIcon)`
    color: var(--white);
    background-color: var(--black);
`;

const ThemedRadiusIcon = ({ type, ...rest }) => {
    switch (type) {
        case "dark":
            return <DarkRadiusIcon {...rest} />;
        default:
            return <WhiteRadiusIcon {...rest} />;
    }
};

const SocialName = styled.div`
    margin: 0 8px;
    font-size: 12px;
`;

const LinkContainer = styled.a`
    text-decoration: none;
`;

const SocialLink = ({ type = "light", text, url, icon }) => (
    <LinkContainer href={url}>
        <ThemedRadiusIcon
            type={type}
            align="center"
            justify="center"
            gutter={8}
            padding={8}
        >
            <FontAwesomeIcon icon={icon} />
            {text && <SocialName>{text}</SocialName>}
        </ThemedRadiusIcon>
    </LinkContainer>
);
SocialLink.propTypes = {
    type: PropTypes.oneOf(["dark", "light"]),
    text: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.string
};

export default SocialLink;
