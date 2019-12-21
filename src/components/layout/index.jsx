import React from "react";
import PropTypes from "prop-types";

import { useCookies } from "react-cookie";

import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

import Menu from "./menu";
import Footer from "./footer";
import CookiesAlert from "../cookies-alert";

const cookiesAlertHiddenCookieName = "cookies-alert-hidden";

const Layout = ({ children }) => {
    const [cookies, setCookie] = useCookies([cookiesAlertHiddenCookieName]);

    const handleHide = () => {
        setCookie(cookiesAlertHiddenCookieName, true, {
            expires: new Date(Date.now() + 31557600000)
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Menu />
            {children}
            <Footer />

            <CookiesAlert
                show={!cookies[cookiesAlertHiddenCookieName]}
                onHide={handleHide}
            />
        </ThemeProvider>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
