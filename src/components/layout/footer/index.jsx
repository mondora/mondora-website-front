import React from "react";

import styled from "styled-components";

import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import { Flex } from "reflexbox";

import MaxWidthContainer from "../../max-width-container";
import SocialLink from "../../social-link";
import Hidden from "../../hidden";
import Subtitle from "../../subtitle";

const FooterContainer = styled.footer`
    display: flex;
    border-top: 1px solid var(--border-dark-gray);
    background: var(--background-dark-gray);
    color: var(--white);
`;

const ExternalLink = styled.a`
    font-size: 11pt;
    text-decoration: none;
    color: var(--white);
    display: block;
    transition: 0.3s ease;
    &:hover {
        color: var(--primary);
    }
`;

const Footer = () => {
    const { contentfulFooter } = useStaticQuery(graphql`
        query {
            contentfulFooter {
                motto
                copyright
                miniLogo {
                    fixed(width: 40) {
                        ...GatsbyContentfulFixed
                    }
                }
                contacts {
                    companyName
                    legalAddress
                    partitaIva
                    codiceSdi
                    email
                    github
                    instagram
                    twitter
                    youtube
                    facebook
                    linkedIn
                }
                columns {
                    links {
                        text
                        link
                    }
                    title
                }
            }
        }
    `);

    const Socials = [
        {
            link: contentfulFooter.contacts.github,
            icon: "github"
        },
        {
            link: contentfulFooter.contacts.instagram,
            icon: "instagram"
        },
        {
            link: contentfulFooter.contacts.facebook,
            icon: "facebook"
        },
        {
            link: contentfulFooter.contacts.linkedIn,
            icon: "linkedin"
        },
        {
            link: contentfulFooter.contacts.twitter,
            icon: "twitter"
        },
        {
            link: contentfulFooter.contacts.youtube,
            icon: "youtube"
        }
    ];

    return (
        <FooterContainer role="contentinfo">
            <MaxWidthContainer
                width="100%"
                my={4}
                justifyContent="space-between"
            >
                <Flex width={[1, "auto"]} my={2}>
                    <Flex my={2}>
                        <Hidden smDown={true}>
                            <Image fixed={contentfulFooter.miniLogo.fixed} />
                        </Hidden>
                    </Flex>

                    <Flex flexDirection="column" px={3}>
                        <Subtitle light={true}>
                            {contentfulFooter.copyright}
                            <br />
                            {contentfulFooter.contacts.companyName}
                            <br />
                            {contentfulFooter.contacts.legalAddress}
                            <br />
                            {contentfulFooter.contacts.partitaIva}
                            <br />
                            {contentfulFooter.contacts.codiceSdi}
                            <br />
                            {contentfulFooter.contacts.email}
                        </Subtitle>
                        <Subtitle light={true}>
                            {contentfulFooter.motto}
                        </Subtitle>
                    </Flex>
                </Flex>

                <Flex
                    width={[1, "auto"]}
                    my={2}
                    flexDirection={"column"}
                    align={["start", "end"]}
                >
                    <Flex flexWrap="wrap">
                        {contentfulFooter.columns.map((column, i) => (
                            <Flex
                                key={i}
                                flexDirection="column"
                                width={[1 / 2, 1 / 4]}
                                pl={3}
                            >
                                <Subtitle light={true}>{column.title}</Subtitle>
                                <nav
                                    role="navigation"
                                    aria-label={column.title}
                                >
                                    {column.links.map((link, i) => (
                                        <ExternalLink key={i} href={link.link}>
                                            {link.text}
                                        </ExternalLink>
                                    ))}
                                </nav>
                            </Flex>
                        ))}
                    </Flex>

                    <Flex flexWrap="wrap" mt={40} ml={3}>
                        {Socials.map(
                            social =>
                                social.link && (
                                    <Flex margin={1} key={social.icon}>
                                        <SocialLink {...social} />
                                    </Flex>
                                )
                        )}
                    </Flex>
                </Flex>
            </MaxWidthContainer>
        </FooterContainer>
    );
};

export default Footer;
