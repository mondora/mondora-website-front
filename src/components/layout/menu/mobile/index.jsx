import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import Grid from "../../../grid";

import Image from "gatsby-image";
import {
    MenuLink,
    AnimatedMenu,
    MenuItem,
    ToolbarGrid,
    Icon,
    Spacer
} from "./styled";

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
    },
    {
        to: "https://bcalmbcorp.com/",
        text: "Blog :m"
    }
];

const MobileMenu = () => {
    const { miniLogoImage } = useStaticQuery(graphql`
        query {
            miniLogoImage: file(relativePath: { eq: "logo/small-light.png" }) {
                childImageSharp {
                    fixed(height: 32) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <AnimatedMenu container direction="column" open={open}>
                {links.map(link => (
                    <MenuItem item xs={12} align="center" justify="center">
                        <MenuLink to={link.to} activeClassName={"active"}>
                            {link.text}
                        </MenuLink>
                    </MenuItem>
                ))}
            </AnimatedMenu>
            <ToolbarGrid container justify="space-between" align="center">
                <Image fixed={miniLogoImage.childImageSharp.fixed} />
                <Grid item justify="flex-end" align="center">
                    <Icon
                        icon={open ? faTimes : faBars}
                        onClick={handleToggle}
                    />
                </Grid>
            </ToolbarGrid>
            <Spacer />
        </>
    );
};

export default MobileMenu;
