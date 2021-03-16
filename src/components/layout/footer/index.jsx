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
                    legalAddress
                    partitaIva
                    email
                    phoneNumber
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
            href: contentfulFooter.contacts.github,
            icon: "github"
        },
        {
            href: contentfulFooter.contacts.instagram,
            icon: "instagram"
        },
        {
            href: contentfulFooter.contacts.facebook,
            icon: "facebook"
        },
        {
            href: contentfulFooter.contacts.linkedIn,
            icon: "linkedin"
        },
        {
            href: contentfulFooter.contacts.twitter,
            icon: "twitter"
        },
        {
            href: contentfulFooter.contacts.youtube,
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
                            {contentfulFooter.contacts.legalAddress}
                            <br />
                            {contentfulFooter.contacts.partitaIva}
                            <br />
                            {contentfulFooter.motto}
                        </Subtitle>

                        <Subtitle light={true}>
                            {contentfulFooter.contacts.phoneNumber}
                            {" - "}
                            {contentfulFooter.contacts.email}
                        </Subtitle>

                        <Subtitle>
                            <Flex margin={-1}>
                                {Socials.map(
                                    social =>
                                        social.href && (
                                            <Flex margin={1} key={social.icon}>
                                                <SocialLink {...social} />
                                            </Flex>
                                        )
                                )}
                            </Flex>
                        </Subtitle>
                    </Flex>
                </Flex>

                <Flex width={[1, "auto"]} flexWrap="wrap" my={2}>
                    {contentfulFooter.columns.map((column, i) => (
                        <Flex
                            key={i}
                            flexDirection="column"
                            width={[1 / 2, 1 / 4]}
                            pl={3}
                        >
                            <Subtitle light={true}>{column.title}</Subtitle>
                            <nav role="navigation" aria-label={column.title}>
                                {column.links.map((link, i) => (
                                    <ExternalLink key={i} href={link.link}>
                                        {link.text}
                                    </ExternalLink>
                                ))}
                            </nav>
                        </Flex>
                    ))}
                </Flex>
            </MaxWidthContainer>
        </FooterContainer>
    );
};

export default Footer;
