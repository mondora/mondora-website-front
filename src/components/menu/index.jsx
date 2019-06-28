import React from "react";

import styled from "styled-components";

import StackPanel from "../stackpanel";

import { Link } from "gatsby";

const Container = styled.div`
    padding: 0 64px;
    margin: auto;
    background-color: ${props => props.theme.colors.primary};
    /* line-height: 1; */
`;

const links = [
    {
        to: "/about",
        text: "About"
    },
    {
        to: "/bcorp",
        text: "BCorp"
    },
    {
        to: "/contacts",
        text: "Contatti"
    },
    {
        to: "/meet-the-team",
        text: "Team"
    },
    {
        to: "/our-services",
        text: "Servizi"
    }
];

const Menu = () => (
    <Container>
        <StackPanel justify="space-between">
            <StackPanel>
                <span>{"Logo"}</span>
            </StackPanel>

            <StackPanel gutter={32}>
                {links.map(link => (
                    <Link to={link.to}>{link.text}</Link>
                ))}
            </StackPanel>
        </StackPanel>
    </Container>
);

export default Menu;
