import React from "react";

import styled from "styled-components";

import StackPanel from "../stackpanel";

import Underline from "../../../static/images/underline.png";

import { Link } from "gatsby";

const MiniLogo = styled.div`
    &:before {
        color: #ffea00;
        content: ":";
    }
    margin-top: -10px;
    grid-area: 1 / 1 / 3 / 2;
    font-size: ${props => props.theme.size.text.mondora};

    @media (max-width: 992px) {
        grid-area: 1 / 1 / 2 / 2;
    }
`;

const Container = styled.div`
    padding: 0 64px;
    margin-left: auto;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 16px;
`;

const SuperLink = styled(Link)`
    margin: 8px;
    padding-bottom: 15px;
    font-size: ${props => props.theme.size.text.menu};
    text-decoration: none;
    color: ${props => props.theme.colors.text.header};
    display: block;
    &.active {
        background-image: url(${Underline});
        background-repeat: no-repeat;
        background-size: 46px;
        background-position-y: bottom;
        background-position-x: left;
    }
`;

const links = [
    {
        to: "/",
        text: "Home",
        underscore: Underline
    },
    {
        to: "/about",
        text: "About Us",
        underscore: Underline
    },
    {
        to: "/meet-the-team",
        text: "Meet the Team",
        underscore: Underline
    },
    {
        to: "/bcorp",
        text: "Impact",
        underscore: Underline
    },
    {
        to: "/work-with-us",
        text: "Work with us",
        underscore: Underline
    },
    {
        to: "/contacts",
        text: "Contacts",
        underscore: Underline
    },
    {
        to: "/",
        text: "Blog",
        underscore: Underline
    }
];

const Menu = () => (
    <Container>
        <StackPanel justify="space-between">
            <StackPanel>
                <MiniLogo>{"mondora"}</MiniLogo>
            </StackPanel>

            <StackPanel gutter={24} >
                {links.map(link => (
                    <SuperLink to={link.to} activeClassName={"active"}>{link.text}</SuperLink>
                ))}
            </StackPanel>
        </StackPanel>
    </Container>
);

export default Menu;
