import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import styled from "styled-components";

import Image from "gatsby-image";

import { Flex } from "reflexbox";

const SuperLink = styled(AniLink)`
    font-size: ${props => props.theme.size.text.menu};
    text-decoration: none;
    color: var(--black);
    padding: 12px 0;
    margin-right: 16px;

    &.active {
        background-image: url(${require("../../../../../static/images/underlines.svg")});
        background-repeat: no-repeat;
        background-size: 48px;
        background-position-y: bottom;
        background-position-x: center;
    }
`;

const BlogButton = styled.a`
    font-size: ${props => props.theme.size.text.menu};
    padding: 2px 8px;
    color: var(--black);
    border: 1px solid var(--variant-black);
    border-radius: 24px;
    text-decoration: none;
`;

const links = [
    {
        to: "/about",
        text: "About Us"
    },
    {
        to: "/bcorp",
        text: "Impact"
    },
    {
        to: "/work-with-us",
        text: "Work with us"
    },
    {
        to: "/contacts",
        text: "Contacts"
    }
];

const DesktopMenu = () => {
    const { miniLogoImage } = useStaticQuery(graphql`
        query {
            miniLogoImage: file(
                relativePath: { eq: "logo/extended-dark.png" }
            ) {
                childImageSharp {
                    fixed(width: 156) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (
        <Flex my={32} justifyContent="space-between" alignItems="center">
            <Link to="/">
                <Image fixed={miniLogoImage.childImageSharp.fixed} />
            </Link>

            <Flex justifyContent="space-between" alignItems="center">
                {links.map((link, i) => (
                    <SuperLink
                        key={i}
                        to={link.to}
                        paintDrip
                        direction="none"
                        color="white"
                        activeClassName="active"
                    >
                        {link.text}
                    </SuperLink>
                ))}
                <BlogButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://bcalmbcorp.com/"
                >
                    {"Blog :m"}
                </BlogButton>
            </Flex>
        </Flex>
    );
};

export default DesktopMenu;
