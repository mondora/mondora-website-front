import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import DesktopMenu from "./desktop";
import MobileMenu from "./mobile";
import Hidden from "../../hidden";

import MaxWidthContainer from "../../max-width-container";

const Menu = () => {
    const { contentfulMenu } = useStaticQuery(graphql`
        query {
            contentfulMenu {
                externalLinks {
                    link
                    text
                }
                internalLinks {
                    text
                    link
                }
                blogLink {
                    link
                    text
                }
            }
        }
    `);

    return (
        <header role="banner">
            <MaxWidthContainer>
                <Hidden smUp={true}>
                    <MobileMenu
                        internal={contentfulMenu.internalLinks}
                        external={contentfulMenu.externalLinks}
                        blog={contentfulMenu.blogLink}
                    />
                </Hidden>
                <Hidden smDown={true}>
                    <DesktopMenu
                        internal={contentfulMenu.internalLinks}
                        external={contentfulMenu.externalLinks}
                        blog={contentfulMenu.blogLink}
                    />
                </Hidden>
            </MaxWidthContainer>
        </header>
    );
};

export default Menu;
