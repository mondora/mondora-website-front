import React from "react";
import PropTypes from "prop-types";

import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

import Menu from "./menu";
import Footer from "./footer";
import CookiesAlert from "./cookies-alert";

const Layout = ({ children }) => (
    <ThemeProvider theme={theme}>
        <Menu />
        {children}
        <Footer />
        <CookiesAlert />
    </ThemeProvider>
);

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
