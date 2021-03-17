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
import FullWidthImage from "../../components/full-width-image";
import Carousel from "../../components/carousel";

import SwirlSeparator from "../../images/separator.svg";

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

const carouselSettings = {
    arrows: true,
    dots: true,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                dots: false
            }
        }
    ]
};

const WorkWithUs = () => {
    const { allInstaNode, contentfulWorkWithUsPage } = useStaticQuery(graphql`
        query ScrapingQuery {
            allInstaNode(limit: 12) {
                edges {
                    node {
                        id
                        username
                        likes
                        caption
                        localFile {
                            childImageSharp {
                                fluid(
                                    quality: 70
                                    maxWidth: 600
                                    maxHeight: 600
                                ) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
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
                    <img alt="" src={SwirlSeparator} />
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

            <Box mb={5}>
                <Carousel {...carouselSettings}>
                    {allInstaNode.edges.map(instagram => (
                        <Box p={3} key={instagram.node.id}>
                            <FullWidthImage
                                fluid={
                                    instagram.node.localFile.childImageSharp
                                        .fluid
                                }
                            />
                        </Box>
                    ))}
                </Carousel>
            </Box>
            <MaxWidthContainer justifyContent={"center"}>
                <Box width={[1 / 2, 1 / 4, 0]}>
                    <img alt="" src={SwirlSeparator} />
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
