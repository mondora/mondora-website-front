import "./static/style.css";

import React from "react";

import { ThemeProvider } from "styled-components";

import { theme } from "./src/styles/theme";
import Layout from "./src/components/layout";

export const wrapRootElement = ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
            <Layout>{element}</Layout>
        </ThemeProvider>
    );
};
