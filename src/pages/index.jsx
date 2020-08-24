import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import PageMetadata from "../components/page-metadata";
import Header from "../components/header";

import WhatWeCanDo from "../components/pages/home/what-we-can-do";
import Blog from "../components/pages/home/blog";
import Benefit from "../components/pages/home/benefit";
import About from "../components/pages/home/about";

import { ThemeProvider } from "styled-components";

import { theme } from "../styles/theme";

const rebassTheme = {
    theme,
    space: [0, 4, 8, 16],
    breakpoints: ["32em", "48em", "64em"]
};

const Homepage = () => {
    const { contentfulHomepage } = useStaticQuery(graphql`
        query {
            contentfulHomepage {
                pageName
                rightImage {
                    fluid(quality: 100) {
                        ...GatsbyContentfulFluid
                    }
                }
                leftHeader {
                    childMarkdownRemark {
                        htmlAst
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <ThemeProvider theme={rebassTheme}>
                <PageMetadata />
                <Header
                    left={
                        contentfulHomepage.leftHeader.childMarkdownRemark
                            .htmlAst
                    }
                    rightImage={contentfulHomepage.rightImage.fluid}
                />
                <WhatWeCanDo />
                <Blog />
                <Benefit />
                <About />
            </ThemeProvider>
        </Layout>
    );
};

export default Homepage;
