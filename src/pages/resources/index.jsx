import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";

import { Box } from "reflexbox";

import Header from "../../components/header";
import Layout from "../../components/layout";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";
import Resource from "../../components/resource";
import RefinementBox from "../../components/refinement-box";
import ReasonsRow from "../../components/reasons-row";

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APPLICATION_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Resources = () => {
    const ResourcesList = connectHits(({ hits }) =>
        hits.map((hit, i) => <Resource key={i} data={hit} />)
    );

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
                sections {
                    title
                    description {
                        description
                    }
                }
                filtering {
                    apply
                    label
                    clear
                    contentfulfields {
                        field
                        label
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
            <ReasonsRow reasons={contentfulResourcesPage.sections} />
            <MaxWidthContainer>
                <InstantSearch
                    searchClient={searchClient}
                    indexName="mondora_resources_en"
                >
                    <Box width={[3 / 4]}>
                        <ResourcesList />
                    </Box>
                    <Box width={[1 / 4]} p={4}>
                        <SearchBox />
                        <RefinementBox
                            fields={contentfulResourcesPage.filtering}
                        />
                    </Box>
                </InstantSearch>
            </MaxWidthContainer>
        </Layout>
    );
};

export default Resources;
