import React from "react";

import PropTypes from "prop-types";

import { Flex, Box } from "reflexbox";

import Link from "../../../link";
import ParagraphTitle from "../../../paragraph-title";
import Subtitle from "../../../subtitle";
import SocialLink from "../../../social-link";

const WhereToFindUs = ({ contacts }) => {
    const connects = [
        {
            label: "Email: ",
            value: contacts.email,
            link: `mailto:${contacts.email}`
        }
    ];

    const socials = [
        {
            link: contacts.github,
            icon: "github"
        },
        {
            link: contacts.instagram,
            icon: "instagram"
        },
        {
            link: contacts.facebook,
            icon: "facebook"
        },
        {
            link: contacts.linkedIn,
            icon: "linkedin"
        },
        {
            link: contacts.twitter,
            icon: "twitter"
        },
        {
            link: contacts.youtube,
            icon: "youtube"
        }
    ];

    return (
        <Flex flexDirection="column" backgroundColor="white">
            <Box my={2}>
                <ParagraphTitle>{"Registered office:"}</ParagraphTitle>
                <Subtitle>{contacts.legalAddress}</Subtitle>
            </Box>
            <Box my={2}>
                <ParagraphTitle>{"Contact us:"}</ParagraphTitle>
                <Subtitle>
                    {connects.map(
                        connect =>
                            connect.link && (
                                <div key={connect.value}>
                                    <strong>{connect.label}</strong>
                                    <Link to={connect.link}>
                                        {connect.value}
                                    </Link>
                                </div>
                            )
                    )}
                </Subtitle>
            </Box>
            <Box my={2}>
                <ParagraphTitle>{"Follow us on:"}</ParagraphTitle>
                <Subtitle>
                    <Flex
                        my={1}
                        justifyContent={["center", "center", "flex-start"]}
                    >
                        {socials.map(
                            social =>
                                social.link && (
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
