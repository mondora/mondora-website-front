import React from "react";

import DesktopMenu from "./desktop";
import MobileMenu from "./mobile";
import Hidden from "../../hidden";

const Menu = () => {
    return (
        <>
            <Hidden mdUp>
                <MobileMenu />
            </Hidden>
            <Hidden mdDown>
                <DesktopMenu />
            </Hidden>
        </>
    );
};

export default Menu;
