import React from "react";

import { Flex, Box } from "reflexbox";

import ParagraphTitle from "../../../paragraph-title";
import Subtitle from "../../../subtitle";
import SocialLink from "../../../social-link";

const Socials = [
    {
        href: "https://github.com/mondora/",
        icon: "github"
    },
    {
        href: "https://www.instagram.com/mondoracom/",
        icon: "instagram"
    },
    {
        href: "https://it-it.facebook.com/mondoracom/",
        icon: "facebook"
    },
    {
        href: "https://www.linkedin.com/company/mondora-s-p-a-/",
        icon: "linkedin"
    },
    {
        href: "https://twitter.com/mondora",
        icon: "twitter"
    },
    {
        href: "https://www.youtube.com/channel/UCeAVpel9SZj6WKHWLEtVlsg",
        icon: "youtube"
    }
];

const WhereToFindUs = () => (
    <Flex flexDirection="column" backgroundColor="white">
        <Box m={2}>
            <ParagraphTitle>{"Operative Office:"}</ParagraphTitle>
            <Subtitle>
                {"Via Europa 1250, 23020 Berbenno di Valtellina (SO)"}
            </Subtitle>
        </Box>
        <Box m={2}>
            <ParagraphTitle>{"Legal Office:"}</ParagraphTitle>
            <Subtitle>
                {"Via Uberto Visconti di Modrone 33, 20122, Milano"}
            </Subtitle>
        </Box>
        <Box m={2}>
            <ParagraphTitle>{"Follow us on:"}</ParagraphTitle>
            <Subtitle>
                <Flex
                    margin={1}
                    justifyContent={["center", "center", "flex-start"]}
                >
                    {Socials.map(social => (
                        <Flex margin={1} key={social.icon}>
                            <SocialLink theme={"dark"} {...social} />
                        </Flex>
                    ))}
                </Flex>
            </Subtitle>
        </Box>
    </Flex>
);

export default WhereToFindUs;
