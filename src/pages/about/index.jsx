import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Layout from "../../components/layout";
import PageMetadata from "../../components/page-metadata";

import Header from "../../components/header";
import AboutSection from "../../components/pages/about-us/about-section";

const About = () => {
    const { contentfulAboutUsPage } = useStaticQuery(graphql`
        query {
            contentfulAboutUsPage {
                id
                node_locale
                metaDescr {
                    metaDescr
                }
                metaTitle {
                    metaTitle
                }
                rightHeader {
                    childMarkdownRemark {
                        htmlAst
                    }
                }
                leftHeader {
                    childMarkdownRemark {
                        htmlAst
                    }
                }
                sections {
                    sectionName
                    imageRight
                    darkTheme
                    title
                    description {
                        description
                    }
                    subtitle {
                        subtitle
                    }
                    voices {
                        title
                        description {
                            description
                        }
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
            <PageMetadata
                title={contentfulAboutUsPage.metaTitle.metaTitle}
                description={contentfulAboutUsPage.metaDescr.metaDescr}
                locale={contentfulAboutUsPage.node_locale}
            />
            <Header
                left={
                    contentfulAboutUsPage.leftHeader.childMarkdownRemark.htmlAst
                }
                right={
                    contentfulAboutUsPage.rightHeader.childMarkdownRemark
                        .htmlAst
                }
            />

            {contentfulAboutUsPage.sections.map((section, i) => (
                <AboutSection section={section} key={i} />
            ))}
        </Layout>
    );
};

export default About;
