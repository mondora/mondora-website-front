import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import styled from "styled-components";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Grid from "../../../grid";

import Image from "gatsby-image";

const Container = styled.div`
    background-color: var(--background-dark-gray);
`;

const ClosedMenu = styled(Grid)`
    height: 65px;
    padding: 0 ${props => props.theme.spacing.unit * 4}px;
`;

const BurgerBunner = styled(FontAwesomeIcon)`
    font-size: 16pt;
    color: var(--white);
`;

const Item = styled.div`
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border-bottom: 1px solid var(--border-dark-gray);
`;

const OpenedMenu = styled.div`
    border-top: 1px solid var(--white);
`;

const MenuLink = styled(Link)`
    text-decoration: none;
    color: var(--white);
`;

const BlogLink = styled.div`
    text-decoration: none;
    color: var(--white);
`;

const links = [
    {
        to: "/about",
        text: "ABOUT US"
    },
    {
        to: "/meet-the-team",
        text: "MEET THE TEAM"
    },
    {
        to: "/bcorp",
        text: "IMPACT"
    },
    {
        to: "/work-with-us",
        text: "WORK WITH US"
    },
    {
        to: "/contacts",
        text: "CONTACTS"
    }
];

// TODO: review grid usage
const MobileMenu = () => {
    const { miniLogoImage } = useStaticQuery(graphql`
        query {
            miniLogoImage: file(relativePath: { eq: "logo/small-light.png" }) {
                childImageSharp {
                    fixed(height: 40) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <Container>
            <ClosedMenu justify="space-between" align="center">
                <Image fixed={miniLogoImage.childImageSharp.fixed} />
                <Grid gutter={16} align="center">
                    <BurgerBunner
                        icon={isMenuOpen ? faTimes : faBars}
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    />
                </Grid>
            </ClosedMenu>
            {isMenuOpen && (
                <OpenedMenu>
                    {links.map(link => (
                        <Item>
                            <MenuLink to={link.to} activeClassName={"active"}>
                                {link.text}
                            </MenuLink>
                        </Item>
                    ))}
                    <Item>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://bcalmbcorp.com/"
                        >
                            <BlogLink>{"BLOG :m"}</BlogLink>
                        </a>
                    </Item>
                </OpenedMenu>
            )}
        </Container>
    );
};

export default MobileMenu;
