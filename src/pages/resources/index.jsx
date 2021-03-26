import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import algoliasearch from "algoliasearch/lite";
import {
    InstantSearch,
    RefinementList,
    SearchBox,
    Hits
} from "react-instantsearch-dom";

import Header from "../../components/header";
import Layout from "../../components/layout";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";

const searchClient = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_SEARCH_KEY
);

const Resources = () => {
    const { contentfulResourcesPage } = useStaticQuery(graphql`
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
                    contentfulResourcesPage.leftHeader.childMarkdownRemark
                        .htmlAst
                }
                rightImage={contentfulResourcesPage.rightImage}
            />
            <MaxWidthContainer>
                <InstantSearch
                    searchClient={searchClient}
                    indexName="mondora_resources_en"
                >
                    <SearchBox />
                    <RefinementList attribute="tags" />
                    <RefinementList attribute="language" />
                    <RefinementList attribute="type" />
                    <Hits />
                </InstantSearch>
            </MaxWidthContainer>
        </Layout>
    );
};

export default Resources;
