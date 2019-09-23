import React from "react";

import useWindowSize from "@rehooks/window-size";

import DesktopMenu from "./desktop";
import MobileMenu from "./mobile";

const Menu = () => {
    let windowSize = 900;
    if (typeof window !== "undefined") {
        windowSize = useWindowSize();
    }

    return (
        <>{windowSize.innerWidth <= 790 ? <MobileMenu /> : <DesktopMenu />}</>
    );
};

export default Menu;
