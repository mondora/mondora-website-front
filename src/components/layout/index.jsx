import React from "react";
import PropTypes from "prop-types";

import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

import Menu from "./menu";
import Footer from "./footer";

const Layout = ({ children }) => (
    <ThemeProvider theme={theme}>
        <Menu />
        <main>{children}</main>
        <Footer />
    </ThemeProvider>
);

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
