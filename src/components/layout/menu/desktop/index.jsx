import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import StackPanel from "../../../stackpanel";
import mondoraLogoPath from "../../assets/mondora-logo.svg";

const Container = styled.div`
    padding: 30px 120px;

    @media (max-width: 768px) {
        background-color: var(--background-dark-gray);
        padding: 30px 16px;
    }
`;

const MiniLogo = styled(Link)`
    width: 192px;
    background: url(${mondoraLogoPath});
    background-repeat: no-repeat;
`;

const SuperLink = styled(Link)`
    font-size: ${props => props.theme.size.text.menu};
    white-space: nowrap;
    text-decoration: none;
    padding: 12px 20px;
    color: var(--black);

    &.active {
        background-image: url(${require("../../../../../static/images/underline.png")});
        background-repeat: no-repeat;
        background-size: 48px;
        background-position-y: bottom;
        background-position-x: center;
    }
`;

const BlogButtonContainer = styled.a`
    padding: 0px 20px;
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
                {links.map(link => (
                    <SuperLink to={link.to} activeClassName={"active"}>
                        {link.text}
                    </SuperLink>
                ))}
                <BlogButtonContainer
                    target="_blank"
                    href="https://bcalmbcorp.com/"
                >
                    <BlogButton>{"Blog :m"}</BlogButton>
                </BlogButtonContainer>
            </StackPanel>
        </StackPanel>
    </Container>
);

export default DesktopMenu;
