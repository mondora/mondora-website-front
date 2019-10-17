import React from "react";

import DesktopMenu from "./desktop";
import MobileMenu from "./mobile";
import Hidden from "../../hidden";

const Menu = () => {
    return (
        <>
            <Hidden xsUp>
                <MobileMenu />
            </Hidden>
            <Hidden xsDown>
                <DesktopMenu />
            </Hidden>
        </>
    );
};

export default Menu;
