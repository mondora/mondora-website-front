import React, { useState } from "react";

import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";

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

const MobileMenu = ({ internal, external, blog }) => {
    const { contentfulMenu } = useStaticQuery(graphql`
        query {
            contentfulMenu {
                mobileLogo {
                    fixed(height: 32) {
                        ...GatsbyContentfulFixed
                    }
                }
                blogLogo {
                    fixed(height: 16) {
                        ...GatsbyContentfulFixed
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
                {internal.map((link, i) => (
                    <MenuItem background={"dark"} key={i}>
                        <MenuLink to={link.link} activeClassName={"active"}>
                            {link.text}
                        </MenuLink>
                    </MenuItem>
                ))}

                {external.map((link, i) => (
                    <MenuItem background={"dark"} key={i}>
                        <BlogLink
                            as="a"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={link.link}
                        >
                            {link.text}
                        </BlogLink>
                    </MenuItem>
                ))}

                <MenuItem background={"light"}>
                    <BlogLink
                        target="_blank"
                        rel="noopener noreferrer"
                        href={blog.link}
                    >
                        {blog.text !== "Blog :m" ? (
                            blog.text
                        ) : (
                            <>
                                {"BLOG "}
                                <InlineLogo
                                    fixed={contentfulMenu.blogLogo.fixed}
                                />
                            </>
                        )}
                    </BlogLink>
                </MenuItem>
            </AnimatedMenu>
            <ToolbarGrid>
                <Link to={"/"}>
                    <Image fixed={contentfulMenu.mobileLogo.fixed} />
                </Link>

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

MobileMenu.propTypes = {
    internal: PropTypes.array,
    external: PropTypes.array,
    blog: PropTypes.object
};

export default MobileMenu;
