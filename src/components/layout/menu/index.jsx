import React from "react";

import DesktopMenu from "./desktop";
import MobileMenu from "./mobile";
import Hidden from "../../hidden";

const Menu = () => {
    return (
        <>
            <Hidden smUp>
                <MobileMenu />
            </Hidden>
            <Hidden smDown>
                <DesktopMenu />
            </Hidden>
        </>
    );
};

export default Menu;
