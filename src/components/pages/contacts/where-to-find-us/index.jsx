import React from "react";

import PropTypes from "prop-types";

import { Flex, Box } from "reflexbox";

import ParagraphTitle from "../../../paragraph-title";
import Subtitle from "../../../subtitle";
import SocialLink from "../../../social-link";

const WhereToFindUs = ({ contacts }) => {
    const connects = [
        {
            href: contacts.email,
            title: "Email"
        }
    ];

    const socials = [
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
                <ParagraphTitle>{"Registered office:"}</ParagraphTitle>
                <Subtitle>{contacts.legalAddress}</Subtitle>
            </Box>
            <Box m={2}>
                <ParagraphTitle>{"Contact us:"}</ParagraphTitle>
                <Subtitle>
                    <Flex
                        margin={1}
                        justifyContent={["center", "center", "flex-start"]}
                    >
                        {connects.map(
                            connect =>
                                connect.href && (
                                    <Flex margin={1} key={connect.title}>
                                        <SocialLink theme={"dark"} />
                                    </Flex>
                                )
                        )}
                    </Flex>
                </Subtitle>
            </Box>
            <Box m={2}>
                <ParagraphTitle>{"Follow us on:"}</ParagraphTitle>
                <Subtitle>
                    <Flex
                        margin={1}
                        justifyContent={["center", "center", "flex-start"]}
                    >
                        {socials.map(
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
