import React from "react";

import Layout from "../components/layout";
import Header from "../components/pages/home/header";
import WhatWeCanDo from "../components/pages/home/what-we-can-do";

import Blog from "../components/pages/home/blog";
import Benefit from "../components/pages/home/benefit";
import About from "../components/pages/home/about";

import { ThemeProvider } from "styled-components";

import theme from "../styles/theme";

const rebassTheme = {
    theme,
    space: [0, 4, 8, 16],
    breakpoints: ["32em", "48em", "64em"]
};

const Homepage = () => (
    <Layout>
        <ThemeProvider theme={rebassTheme}>
            <Header />
            <WhatWeCanDo />
            <Blog />
            <Benefit />
            <About />
        </ThemeProvider>
    </Layout>
);

export default Homepage;
