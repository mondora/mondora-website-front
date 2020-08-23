import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Layout from "../../components/layout";
import PageMetadata from "../../components/page-metadata";

import Header from "../../components/pages/about-us/header";
import WhoWeAre from "../../components/pages/about-us/who-we-are";
import WhereDoWeComeFrom from "../../components/pages/about-us/where-do-we-come-from";
import WhereAreWeDreamingOfGoingTogether from "../../components/pages/about-us/where-are-we-dreaming-of-going-together";

const About = () => {
    const { contentfulAboutUsPage } = useStaticQuery(graphql`
        query {
            contentfulAboutUsPage {
                id
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
            }
        }
    `);

    console.log(contentfulAboutUsPage);

    return (
        <Layout>
            <PageMetadata
                title={contentfulAboutUsPage.metaTitle.metaTitle}
                description={contentfulAboutUsPage.metaDescr.metaDescr}
            />
            <Header />
            <WhoWeAre />
            <WhereDoWeComeFrom />
            <WhereAreWeDreamingOfGoingTogether />
        </Layout>
    );
};

export default About;
