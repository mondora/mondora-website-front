import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

import Image from "gatsby-image";
import {
    MenuLink,
    AnimatedMenu,
    MenuItem,
    ToolbarGrid,
    Spacer,
    BlogLink,
    InlineLogo
} from "./styled";
import FeatherIcon from "../../../feather-icon";

const links = [
    {
        to: "/about",
        text: "ABOUT US"
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

const blog = {
    to: "https://bcalmbcorp.com/",
    text: "BLOG"
}

const MobileMenu = () => {
    const { miniLogoImage, blogLogoImage } = useStaticQuery(graphql`
        query {
            miniLogoImage: file(relativePath: { eq: "logo/small-light.png" }) {
                childImageSharp {
                    fixed(height: 32) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            blogLogoImage: file(relativePath: { eq: "logo/small-light.png" }) {
                childImageSharp {
                    fixed(height: 16) {
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
            <AnimatedMenu open={open}>
                {links.map(link => (
                    <MenuItem background={"dark"} key={link.to}>
                        <MenuLink to={link.to} activeClassName={"active"}>
                            {link.text}
                        </MenuLink>
                    </MenuItem>
                ))}
                <MenuItem background={"light"}>
                    <BlogLink
                        target="_blank"
                        rel="noopener noreferrer"
                        href={blog.to}
                    >
                        {blog.text}
                        <InlineLogo fixed={blogLogoImage.childImageSharp.fixed} />
                    </BlogLink>
                </MenuItem>
            </AnimatedMenu>
            <ToolbarGrid>
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
