import React from "react";

import PropTypes from "prop-types";

import { Flex, Box } from "reflexbox";

import ParagraphTitle from "../../../paragraph-title";
import Subtitle from "../../../subtitle";
import SocialLink from "../../../social-link";

const WhereToFindUs = ({ contacts }) => {
    const Socials = [
        {
            href: contacts.github,
            icon: "github"
        },
        {
            href: contacts.instagram,
            icon: "instagram"
        },
        {
            href: contacts.facebook,
            icon: "facebook"
        },
        {
            href: contacts.linkedIn,
            icon: "linkedin"
        },
        {
            href: contacts.twitter,
            icon: "twitter"
        },
        {
            href: contacts.youtube,
            icon: "youtube"
        }
    ];

    return (
        <Flex flexDirection="column" backgroundColor="white">
            <Box m={2}>
                <ParagraphTitle>{"Office:"}</ParagraphTitle>
                {contacts.officeAddress.map(line => (
                    <Subtitle key={line}>{line}</Subtitle>
                ))}
            </Box>
            <Box m={2}>
                <ParagraphTitle>{"Follow us on:"}</ParagraphTitle>
                <Subtitle>
                    <Flex
                        margin={1}
                        justifyContent={["center", "center", "flex-start"]}
                    >
                        {Socials.map(
                            social =>
                                social.href && (
                                    <Flex margin={1} key={social.icon}>
                                        <SocialLink
                                            theme={"dark"}
                                            {...social}
                                        />
                                    </Flex>
                                )
                        )}
                    </Flex>
                </Subtitle>
            </Box>
        </Flex>
    );
};

WhereToFindUs.propTypes = {
    contacts: PropTypes.object
};

export default WhereToFindUs;
