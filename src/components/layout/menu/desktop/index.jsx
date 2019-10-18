import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import blackMondoraLogoPath from "../../assets/mondora-logo-black.svg";
import Grid from "../../../grid";
import InnerLink from "../../../inner-link";
import Hidden from "../../../hidden";

const Container = styled(Grid)`
    height: ${props => props.theme.spacing.unit * 24}px;
`;

const Logo = styled.img`
    height: 100%;
    width: ${props => props.theme.spacing.unit * 38}px;
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
        <Grid item container align="center" justify="space-between" xs={11}>
            <Grid item>
                <InnerLink to="/">
                    <Hidden smDown>
                        <Logo src={blackMondoraLogoPath} alt="logo" />
                    </Hidden>
                </InnerLink>
            </Grid>
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
                    <BlogButton>Blog :m</BlogButton>
                </a>
            </Grid>
        </Grid>
    </Container>
);

export default DesktopMenu;
