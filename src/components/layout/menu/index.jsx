import React from "react";

import useWindowSize from "@rehooks/window-size";

import DesktopMenu from "./desktop";
import MobileMenu from "./mobile";

const Menu = () => {
    const windowSize = useWindowSize();

    return (
        <>{windowSize.innerWidth <= 790 ? <MobileMenu /> : <DesktopMenu />}</>
    );
};

export default Menu;
