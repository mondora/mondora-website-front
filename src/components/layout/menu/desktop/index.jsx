import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import StackPanel from "../../../stackpanel";
import mondoraLogoPath from "../../assets/mondora-logo.svg";
import MaxWidthContainer from "../../../max-width-container";

const Container = styled(MaxWidthContainer)`
    padding: 30px 16px;

    @media (max-width: 790px) {
        display: none;
    }
`;

const MiniLogo = styled(Link)`
    width: 162px;
    background: url(${mondoraLogoPath});
    background-repeat: no-repeat;
`;

const SuperLink = styled(Link)`
    font-size: ${props => props.theme.size.text.menu};
    white-space: nowrap;
    text-decoration: none;
    color: var(--black);
    padding: 12px 0;

    &.active {
        background-image: url(${require("../../../../../static/images/underlines.svg")});
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

const DesktopMenu = () => (
    <Container>
        <StackPanel justify="space-between">
            <StackPanel>
                <MiniLogo to={"/"} />
            </StackPanel>
            <StackPanel gutter={16} align="center">
                {links.map((link, i) => (
                    <SuperLink key={i} to={link.to} activeClassName={"active"}>
                        {link.text}
                    </SuperLink>
                ))}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://bcalmbcorp.com/"
                >
                    <BlogButton>{"Blog :m"}</BlogButton>
                </a>
            </StackPanel>
        </StackPanel>
    </Container>
);

export default DesktopMenu;
