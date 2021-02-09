import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Header from "../../components/header";
import Layout from "../../components/layout";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";
import Resource from "../../components/resource";

const Resources = () => {
    const { contentfulResourcesPage, allContentfulResource } = useStaticQuery(graphql`
        query {
            contentfulResourcesPage {
                metaDescr {
                    metaDescr
                }
                metaTitle {
                    metaTitle
                }
                leftHeader {
                    childMarkdownRemark {
                        headings {
                            id
                            value
                        }
                        htmlAst
                    }
                }
                rightImage {
                    title
                    fluid(quality: 100) {
                        ...GatsbyContentfulFluid
                    }
                }
            }
            allContentfulResource {
                nodes {
                  title
                  type
                  date
                  button {
                    link
                    text
                  }
                  areas
                  tags
                  description {
                    description
                  }
                }
              }
        }
    `);

    return (
        <Layout>
            <PageMetadata
                title={contentfulResourcesPage.metaTitle.metaTitle}
                description={contentfulResourcesPage.metaDescr.metaDescr}
            />
            <Header
                left={
                    contentfulResourcesPage.leftHeader.childMarkdownRemark.htmlAst
                }
                rightImage={contentfulResourcesPage.rightImage}
            />
            <MaxWidthContainer>
                {
                allContentfulResource.nodes.map((resouce, i) => (
                    <Resource data={resouce} key={i}/>
                ))}
            </MaxWidthContainer>
        </Layout>
    );
};

export default Resources;
