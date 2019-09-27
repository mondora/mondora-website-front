import React from "react";

import DesktopMenu from "./desktop";
import MobileMenu from "./mobile";

const Menu = () => {
    return (
        <>
            <MobileMenu />
            <DesktopMenu />
        </>
    );
};

export default Menu;
