import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

import Image from "gatsby-image";
import {
    MenuLink,
    AnimatedMenu,
    MenuItem,
    ToolbarGrid,
    Spacer
} from "./styled";
import FeatherIcon from "../../../feather-icon";

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
            <AnimatedMenu container={true} direction="column" open={open}>
                {links.map(link => (
                    <MenuItem key={link.to} item={true} xs={12} align="center" justify="center">
                        <MenuLink to={link.to} activeClassName={"active"}>
                            {link.text}
                        </MenuLink>
                    </MenuItem>
                ))}
            </AnimatedMenu>
            <ToolbarGrid container={true} justify="space-between" align="center">
                <Image fixed={miniLogoImage.childImageSharp.fixed} />
                <div onClick={handleToggle}>
                    <FeatherIcon
                        color="white"
                        size={24}
                        name={open ? "x" : "menu"}
                    />
                </div>
            </ToolbarGrid>
            <Spacer />
        </>
    );
};

export default MobileMenu;
