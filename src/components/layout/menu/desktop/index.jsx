import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import mondoraLogoPath from "../../assets/mondora-logo.svg";
import Grid from "../../../grid";
import InnerLink from "../../../inner-link";

const Container = styled(Grid)`
    height: ${props => props.theme.spacing.unit * 24}px;
`;

const Logo = styled.img`
    width: ${props => props.theme.spacing.unit * 40}px;
`;

const SuperLink = styled(Link)`
    font-size: ${props => props.theme.size.text.menu};
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
    <Container container justify="center" align="center">
        <Grid item container align="center" xs={10}>
            <Grid item>
                <InnerLink to="/">
                    <Logo src={mondoraLogoPath} alt="logo" />
                </InnerLink>
            </Grid>
            <Grid item grow={1} />
            <Grid container item spacingRatio={4} align="center">
                {links.map((link, i) => (
                    <Grid item>
                        <SuperLink
                            key={i}
                            to={link.to}
                            activeClassName="active"
                        >
                            {link.text}
                        </SuperLink>
                    </Grid>
                ))}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://bcalmbcorp.com/"
                >
                    <BlogButton>{"Blog :m"}</BlogButton>
                </a>
            </Grid>
        </Grid>
    </Container>
);

export default DesktopMenu;
