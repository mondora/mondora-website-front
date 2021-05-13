import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "styled-components";

import { Flex, Box } from "reflexbox";

import Button from "../../components/button";
import PageMetadata from "../../components/page-metadata";
import Header from "../../components/header";
import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import BackgroundStripe from "../../components/background-stripe";
import Subtitle from "../../components/subtitle";
import Title from "../../components/title";
import SwirlSeparator from "../../components/swirl-separator";

const ReasonNumber = styled.h1`
    position: relative;
    left: -48px;
    color: var(--variant-black);
    font-size: 50pt;
    margin: 0;
    &:before {
        color: var(--variant-black);
        content: "°  ";
    }
`;

const WorkWithUs = () => {
    const { contentfulWorkWithUsPage } = useStaticQuery(graphql`
        query ScrapingQuery {
            contentfulWorkWithUsPage {
                node_locale
                handbookButton
                handbookLink
                handbookTitle
                handbookDescription {
                    handbookDescription
                }
                reasonsTitle
                reasons {
                    empty
                    number
                    reason
                    description
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
                rightHeader {
                    childMarkdownRemark {
                        headings {
                            id
                            value
                        }
                        htmlAst
                    }
                }
                metaDescr {
                    metaDescr
                }
                metaTitle {
                    metaTitle
                }
            }
        }
    `);

    return (
        <Layout>
            <PageMetadata
                title={contentfulWorkWithUsPage.metaTitle.metaTitle}
                description={contentfulWorkWithUsPage.metaDescr.metaDescr}
                locale={contentfulWorkWithUsPage.node_locale}
            />
            <Header
                left={
                    contentfulWorkWithUsPage.leftHeader.childMarkdownRemark
                        .htmlAst
                }
                right={
                    contentfulWorkWithUsPage.rightHeader.childMarkdownRemark
                        .htmlAst
                }
            />
            <MaxWidthContainer justifyContent={"center"}>
                <Box width={[1 / 2, 1 / 4, 0]}>
                    <SwirlSeparator width={"100%"} margin={"auto"} />
                </Box>
            </MaxWidthContainer>
            <BackgroundStripe>
                <MaxWidthContainer justifyContent="center">
                    <Title>{contentfulWorkWithUsPage.handbookTitle}</Title>
                    <MaxWidthContainer>
                        <Subtitle center={[true, true]}>
                            {
                                contentfulWorkWithUsPage.handbookDescription
                                    .handbookDescription
                            }
                        </Subtitle>
                    </MaxWidthContainer>
                    <Button
                        to={contentfulWorkWithUsPage.handbookLink}
                        target="_blank"
                    >
                        {contentfulWorkWithUsPage.handbookButton}
                    </Button>
                </MaxWidthContainer>
            </BackgroundStripe>

            <MaxWidthContainer justifyContent={"center"}>
                <Box width={[1 / 2, 1 / 4, 0]}>
                    <SwirlSeparator width={"100%"} margin={"auto"} />
                </Box>
            </MaxWidthContainer>
            <BackgroundStripe>
                <MaxWidthContainer justifyContent="center">
                    <Title>{contentfulWorkWithUsPage.reasonsTitle}</Title>

                    <Flex flexWrap="wrap" padding={-4}>
                        {contentfulWorkWithUsPage.reasons.map(
                            (reason, index) => (
                                <Flex
                                    key={index}
                                    width={[1, 1 / 2, 1 / 3]}
                                    flexDirection="column"
                                    padding={4}
                                >
                                    {!reason.empty && (
                                        <>
                                            <ReasonNumber>
                                                {reason.number}
                                            </ReasonNumber>
                                            <Title>{reason.reason}</Title>
                                            <Subtitle>
                                                {reason.description}
                                            </Subtitle>
                                        </>
                                    )}
                                </Flex>
                            )
                        )}
                    </Flex>
                </MaxWidthContainer>
            </BackgroundStripe>
        </Layout>
    );
};

export default WorkWithUs;
