import React from "react";

import DesktopMenu from "./desktop";
import MobileMenu from "./mobile";
import Hidden from "../../hidden";

import MaxWidthContainer from "../../max-width-container";

const Menu = () => {
    return (
        <MaxWidthContainer>
            <Hidden smUp={true}>
                <MobileMenu />
            </Hidden>
            <Hidden smDown={true}>
                <DesktopMenu />
            </Hidden>
        </MaxWidthContainer>
    );
};

export default Menu;
