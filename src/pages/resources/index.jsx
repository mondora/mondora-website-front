import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, connectHits } from "react-instantsearch-dom";

import { Box } from "reflexbox";

import Header from "../../components/header";
import Layout from "../../components/layout";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";
import Resource from "../../components/resource";
import RefinementBox from "../../components/refinement-box";
import ReasonsRow from "../../components/reasons-row";
import FilteringControls from "../../components/filtering-controls";

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APPLICATION_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Resources = () => {
    const ResourcesList = connectHits(({ hits, ...rest }) =>
        hits.map((hit, i) => <Resource key={i} data={hit} {...rest} />)
    );

    const {
        contentfulResourcesPage,
        allContentfulResource
    } = useStaticQuery(graphql`
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
                    label
                    clear
                    contentfulfields {
                        field
                        label
                        type
                    }
                }
                sorting {
                    label
                    contentfulfields {
                        label
                        value
                    }
                }
                search {
                    value
                    label
                }
                resourceImage {
                    description
                    fluid(quality: 50) {
                        ...GatsbyContentfulFluid
                    }
                }
            }
            allContentfulResource {
                nodes {
                    image {
                        description
                        contentful_id
                        fluid(quality: 50) {
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
            <MaxWidthContainer
                backgroundColor={" var(--background-light-gray)"}
            >
                <InstantSearch
                    searchClient={searchClient}
                    indexName="mondora_resources_en"
                >
                    <Box width={[1 / 4]} pt={4}>
                        <RefinementBox
                            fields={contentfulResourcesPage.filtering}
                        />
                    </Box>
                    <Box width={[3 / 4]} pl={4}>
                        <FilteringControls
                            sorting={contentfulResourcesPage.sorting}
                            search={contentfulResourcesPage.search}
                        />
                        <ResourcesList
                            images={allContentfulResource.nodes}
                            placeholder={contentfulResourcesPage.resourceImage}
                        />
                    </Box>
                </InstantSearch>
            </MaxWidthContainer>
        </Layout>
    );
};

export default Resources;
