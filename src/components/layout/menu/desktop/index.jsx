import React from "react";

import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
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
        background-image: url(${require("../../../../images/underlines.svg")});
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

const DesktopMenu = ({ internal, external, blog }) => {
    const { contentfulMenu } = useStaticQuery(graphql`
        query {
            contentfulMenu {
                desktopLogo {
                    title
                    fixed(width: 156) {
                        ...GatsbyContentfulFixed
                    }
                }
            }
        }
    `);

    return (
        <Flex my={32} justifyContent="space-between" alignItems="center">
            <AniLink to="/" paintDrip direction="none" color="white">
                <Image
                    fixed={contentfulMenu.desktopLogo.fixed}
                    alt={contentfulMenu.desktopLogo.title}
                />
            </AniLink>

            <Flex justifyContent="space-between" alignItems="center">
                {internal.map((link, i) => (
                    <SuperLink
                        key={i}
                        to={link.link}
                        paintDrip
                        direction="none"
                        color="white"
                        activeClassName="active"
                    >
                        {link.text}
                    </SuperLink>
                ))}

                {external.map((link, i) => (
                    <SuperLink
                        key={i}
                        as="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link.link}
                    >
                        {link.text}
                    </SuperLink>
                ))}

                <BlogButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href={blog.link}
                >
                    {blog.text}
                </BlogButton>
            </Flex>
        </Flex>
    );
};

DesktopMenu.propTypes = {
    internal: PropTypes.array,
    external: PropTypes.array,
    blog: PropTypes.object
};

export default DesktopMenu;
