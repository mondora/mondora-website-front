import React, { useState } from "react";

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
import BackgroundStripe from "../../components/background-stripe";
import AstText from "../../components/ast-text";
import SwirlSeparator from "../../components/swirl-separator";
import Hidden from "../../components/hidden";
import FiltersDrawer from "../../components/filters-drawer";

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APPLICATION_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Resources = () => {
    const ResourcesList = connectHits(({ hits, ...rest }) =>
        hits.map((hit, i) => <Resource key={i} data={hit} {...rest} />)
    );

    const [drawerVisible, setDrawerVisible] = useState(false);

    const {
        contentfulResourcesPage,
        allContentfulAsset
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
                intro {
                    childMarkdownRemark {
                        htmlAst
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
            allContentfulAsset {
                nodes {
                    contentful_id
                    fluid(quality: 50, maxWidth: 400) {
                        ...GatsbyContentfulFluid_withWebp
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
            <BackgroundStripe theme={"light"}>
                <MaxWidthContainer
                    mt={5} mb={4}
                    flexDirection="column"
                    alignItems="center"
                >
                    <AstText
                        data={
                            contentfulResourcesPage.intro.childMarkdownRemark
                                .htmlAst
                        }
                    />
                    <SwirlSeparator width="180px" margin="16px" />
                </MaxWidthContainer>
                <MaxWidthContainer>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName="mondora_resources_en"
                    >
                        <Box width={[1, 1, 1, 1 / 4]}>
                            <Hidden xsDown={true}>
                                <RefinementBox
                                    fields={contentfulResourcesPage.filtering}
                                />
                            </Hidden>
                            <Hidden xsUp={true}>
                                <FiltersDrawer
                                    fields={contentfulResourcesPage.filtering}
                                    visible={drawerVisible}
                                    closeDrawer={() =>
                                        setDrawerVisible(!drawerVisible)
                                    }
                                />
                            </Hidden>
                        </Box>

                        <Box
                            width={[1, 1, 1, 3 / 4]}
                            pl={[3, 3, 3, 4]}
                            pr={[3, 3, 3, 0]}
                        >
                            <FilteringControls
                                sorting={contentfulResourcesPage.sorting}
                                search={contentfulResourcesPage.search}
                                openFilters={() =>
                                    setDrawerVisible(!drawerVisible)
                                }
                            />
                            <ResourcesList
                                images={allContentfulAsset.nodes}
                                placeholder={
                                    contentfulResourcesPage.resourceImage
                                }
                            />
                        </Box>
                    </InstantSearch>
                </MaxWidthContainer>
            </BackgroundStripe>
        </Layout>
    );
};

export default Resources;
