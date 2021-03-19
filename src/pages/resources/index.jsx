import React, { useState } from "react";

import { graphql, useStaticQuery } from "gatsby";

import { Box } from "reflexbox";
import { Label, Checkbox } from "@rebass/forms";

import Header from "../../components/header";
import Layout from "../../components/layout";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";
import Resource from "../../components/resource";
import BackgroundStripe from "../../components/background-stripe";
import Title from "../../components/title";

const Resources = () => {
    const [tags, setTags] = useState({});
    console.log(tags);

    const filterResource = resource => {
        if (
            Object.entries(tags).find(tag =>
                tag[1] && resource.tags.includes(tag[0]) ? 1 : 0
            ) ||
            !Object.values(tags).find(value => value)
        )
            return resource;
    };

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
            }
            allContentfulResource {
                group(field: tags) {
                    totalCount
                    fieldValue
                }
                group(field: tags) {
                    totalCount
                    fieldValue
                }
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
                    contentfulResourcesPage.leftHeader.childMarkdownRemark
                        .htmlAst
                }
                rightImage={contentfulResourcesPage.rightImage}
            />
            <MaxWidthContainer>
                <BackgroundStripe theme="light">
                    <Box as="form" onSubmit={e => e.preventDefault()}>
                        <Title>{"Tags"}</Title>
                        {allContentfulResource.group.map((tag, i) => (
                            <Label key={i}>
                                <Checkbox
                                    id={tag.fieldValue}
                                    name={tag.fieldValue}
                                    onChange={event =>
                                        setTags({
                                            ...tags,
                                            [tag.fieldValue]:
                                                event.target.checked
                                        })
                                    }
                                />
                                {tag.fieldValue}
                                {" - ( "}
                                {tag.totalCount}
                                {" ) "}
                            </Label>
                        ))}
                    </Box>
                </BackgroundStripe>
                {allContentfulResource.nodes
                    .filter(resource => filterResource(resource))
                    .map((resouce, i) => (
                        <Resource data={resouce} key={i} />
                    ))}
            </MaxWidthContainer>
        </Layout>
    );
};

export default Resources;
