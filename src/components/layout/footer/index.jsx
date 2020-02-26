import React from "react";

import styled from "styled-components";

import { Link, useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import { Flex } from "reflexbox";

import MaxWidthContainer from "../../max-width-container";
import SocialLink from "../../social-link";
import Hidden from "../../hidden";
import Subtitle from "../../subtitle";

const FooterContainer = styled.div`
    display: flex;
    border-top: 1px solid var(--white);
    background: var(--background-dark-gray);
    color: var(--white);
`;

const SectionLinks = styled(Link)`
    font-size: 11pt;
    text-decoration: none;
    color: var(--white);
`;
const ExternalLink = styled.a`
    font-size: 11pt;
    text-decoration: none;
    color: var(--white);
`;

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

const Footer = () => {
    const { miniLogoImage } = useStaticQuery(graphql`
        query {
            miniLogoImage: file(relativePath: { eq: "logo/small-light.png" }) {
                childImageSharp {
                    fixed(width: 40) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (
        <FooterContainer>
            <MaxWidthContainer
                width="100%"
                my={4}
                justifyContent="space-between"
            >
                <Flex width={[1, "auto"]} my={2}>
                    <Flex my={2}>
                        <Hidden smDown={true}>
                            <Image
                                fixed={miniLogoImage.childImageSharp.fixed}
                            />
                        </Hidden>
                    </Flex>

                    <Flex flexDirection="column" px={3}>
                        <Subtitle light={true}>
                            {"© 2018 mondora srl sb . All Rights Reserved."}
                            <br />
                            {
                                "Via Uberto Visconti di Modrone 33 , 20122, Milano"
                            }
                            <br />
                            {"P.IVA 03680680968"}
                            <br />
                            {"Made with love ❤ in Valtellina"}
                        </Subtitle>

                        <Subtitle light={true}>
                            {"+39 0342 1856456 - info@mondora.com"}
                        </Subtitle>

                        <Subtitle>
                            <Flex margin={-1}>
                                {Socials.map(social => (
                                    <Flex margin={1} key={social.icon}>
                                        <SocialLink {...social} />
                                    </Flex>
                                ))}
                            </Flex>
                        </Subtitle>
                    </Flex>
                </Flex>

                <Flex width={[1, "auto"]} flexWrap="wrap" my={2}>
                    <Flex flexDirection="column" width={[1 / 2, 1 / 4]} pl={3}>
                        <Subtitle light={true}>{"ABOUT"}</Subtitle>
                        <SectionLinks to={"/about"}>{"About us"}</SectionLinks>
                        <SectionLinks to={"/contacts"}>
                            {"Contacts"}
                        </SectionLinks>
                    </Flex>

                    <Flex flexDirection="column" width={[1 / 2, 1 / 4]} pl={3}>
                        <Subtitle light={true}>{"WORK WITH US"}</Subtitle>
                        <SectionLinks to={"/work-with-us"}>
                            {"Work with us"}
                        </SectionLinks>
                        <ExternalLink href={"https://github.com/mondora/handbook"}>{"Mondora handbook"}</ExternalLink>
                    </Flex>

                    <Flex flexDirection="column" width={[1 / 2, 1 / 4]} pl={3}>
                        <Subtitle light={true}>{"IMPACT"}</Subtitle>
                        <SectionLinks to={"/bcorp"}>{"Impact"}</SectionLinks>
                        <ExternalLink href={"https://bcalmbcorp.com/"}>{"Blog BCalm BCorp"}</ExternalLink>
                        <ExternalLink href={"https://medium.com/keep-calm-and-code-on"}>{"Blog tecnico"}</ExternalLink>
                    </Flex>

                    <Flex flexDirection="column" width={[1 / 2, 1 / 4]} pl={3}>
                        <Subtitle light={true}>{"SIDE PROJECTS"}</Subtitle>
                        <ExternalLink href={"http://www.hirebitto.com/"}>{"Hirebitto"}</ExternalLink>
                        <ExternalLink href={"https://cycle2work.io/"}>{"Cycle2Work"}</ExternalLink>
                        <ExternalLink href={""}>{"Minicoder"}</ExternalLink>
                    </Flex>
                </Flex>
            </MaxWidthContainer>
        </FooterContainer>
    );
};

export default Footer;
