import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkContainer, RadiusIcon, SocialName } from "./styled";
import Grid from "../grid";

export const SocialLink = ({ type, text, url, icon }) => (
    <LinkContainer>
        <RadiusIcon
            container
            type={type}
            align="center"
            justify="center"
            spacingRatio={2}
        >
            <Grid item>
                <FontAwesomeIcon icon={icon} />
            </Grid>
            {text && (
                <Grid item>
                    <SocialName>{text}</SocialName>
                </Grid>
            )}
        </RadiusIcon>
    </LinkContainer>
);

SocialLink.propTypes = {
    type: PropTypes.oneOf(["dark", "light"]),
    text: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.object
};

SocialLink.defaultProps = {
    type: "light"
};
