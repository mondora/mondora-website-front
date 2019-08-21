import React from "react";

import styled from "styled-components";

import StackPanel from "../stackpanel";

import { Link } from "gatsby";

const MiniLogo = styled(Link)`
    color: var(--black);
    text-decoration: none;
    font-size: ${props => props.theme.size.text.mondora};
    font-weight: bold;
    padding: 8px 0;

    &:before {
        color: var(--primary);
        content: ":";
    }
`;

const Container = styled.div`
    padding: 16px 64px;
`;

const SuperLink = styled(Link)`
    font-size: ${props => props.theme.size.text.menu};
    white-space: nowrap;
    text-decoration: none;
    padding: 12px 0;
    color: var(--black);

    &.active {
        background-image: url(${require("../../../static/images/underline.png")});
        background-repeat: no-repeat;
        background-size: 48px;
        background-position-y: bottom;
        background-position-x: center;
    }
`;
const BlogButton = styled.button`
    font-size: ${props => props.theme.size.text.menu};
    padding: 8px 16px;
    color: var(--black);
    border: 1px solid var(--variant-black);
    border-radius: 24px;
`;

const links = [
    {
        to: "/",
        text: "Home"
    },
    {
        to: "/about",
        text: "About Us"
    },
    {
        to: "/meet-the-team",
        text: "Meet the Team"
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

const Menu = () => (
    <Container>
        <StackPanel justify="space-between">
            <StackPanel>
                <MiniLogo to={"/"}>{"mondora"}</MiniLogo>
            </StackPanel>

            <StackPanel gutter={16} align="center">
                {links.map(link => (
                    <SuperLink to={link.to} activeClassName={"active"}>
                        {link.text}
                    </SuperLink>
                ))}
                <a href="https://bcalmbcorp.com/">
                    <BlogButton>{"Blog :m"}</BlogButton>
                </a>
            </StackPanel>
        </StackPanel>
    </Container>
);

export default Menu;
