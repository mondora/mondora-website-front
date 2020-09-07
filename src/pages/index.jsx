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
                    title
                    fluid(quality: 100) {
                        ...GatsbyContentfulFluid
                    }
                }
                leftHeader {
                    childMarkdownRemark {
                        htmlAst
                    }
                }
                bcorpLogo {
                    title
                    fixed(width: 80) {
                        ...GatsbyContentfulFixed
                    }
                }
                reasonsTitle {
                    childMarkdownRemark {
                        htmlAst
                    }
                }
                reasons {
                    title
                    description {
                        description
                    }
                }
                blogTitle
                blogButton {
                    link
                    text
                }
                aboutSection {
                    sectionName
                    button {
                        link
                        text
                    }
                    description {
                        description
                    }
                    graphic {
                        title
                        fluid(quality: 100) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
                benefitSection {
                    sectionName
                    button {
                        link
                        text
                    }
                    description {
                        description
                    }
                    graphic {
                        title
                        fluid(quality: 100) {
                            ...GatsbyContentfulFluid
                        }
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
                    rightImage={contentfulHomepage.rightImage}
                />
                <WhatWeCanDo
                    logo={contentfulHomepage.bcorpLogo}
                    reasons={contentfulHomepage.reasons}
                    paragraph={
                        contentfulHomepage.reasonsTitle.childMarkdownRemark
                            .htmlAst
                    }
                />
                <Blog
                    title={contentfulHomepage.blogTitle}
                    button={contentfulHomepage.blogButton}
                />
                <Benefit data={contentfulHomepage.benefitSection} />
                <About data={contentfulHomepage.aboutSection} />
            </ThemeProvider>
        </Layout>
    );
};

export default Homepage;
