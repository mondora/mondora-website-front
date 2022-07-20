import React, { useRef } from "react";

import { graphql, useStaticQuery } from "gatsby";
import { Box, Flex } from "reflexbox";
import styled from "styled-components";

import Layout from "../../components/layout";
import FullWidthImage from "../../components/full-width-image";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";
import PodcastEpisode from "../../components/podcast-episode";
import PodcastTrailer from "../../components/podcast-trailer";
import Title from "../../components/title";
import BackgroundStripe from "../../components/background-stripe";
import SocialLink from "../../components/social-link";
import Section from "../../components/section";
import Divider from "../../components/divider";
import AstText from "../../components/ast-text";
import ParagraphTitle from "../../components/paragraph-title";
import Hidden from "../../components/hidden";

const PatformButtonContainer = styled(Box).attrs({
    width: "fit-content"
})``;
const RefBox = styled(Box).attrs({ m: 2 })`
    @media (max-width: ${props => props.theme.breakpoints[1]}px) {
        scroll-margin: 80px;
    }
`;
const PatformButton = styled(SocialLink).attrs({
    size: 24,
    theme: "dark"
})``;
const PlatformContainer = styled(Flex)`
    align-items: center;
    gap: 10px;
    @media (max-width: ${props => props.theme.breakpoints[0]}px) {
        flex-direction: column;
    }
    @media (max-width: ${props => props.theme.breakpoints[1]}px) {
        justify-content: center;
        flex-wrap: wrap;
    }
    @media (min-width: ${props => props.theme.breakpoints[1]}px) {
        justify-content: start;
        flex-wrap: nowrap;
    }
    @media (min-width: ${props => props.theme.breakpoints[0]}px) {
        flex-direction: row;
    }
`;

const Podcast = () => {
    const platformRef = useRef(null);
    const { contentfulPodcastPage, allBuzzsproutPodcastEpisode } =
        useStaticQuery(graphql`
            query {
                contentfulPodcastPage {
                    id
                    node_locale
                    metaDescr {
                        metaDescr
                    }
                    metaTitle {
                        metaTitle
                    }
                    rightImage {
                        title
                        fluid(quality: 100) {
                            ...GatsbyContentfulFluid
                        }
                    }
                    leftHeader {
                        childMarkdownRemark {
                            htmlAst
                        }
                    }
                    externalTitle
                    externalPlatforms {
                        id
                        icon
                        link
                        text
                        image {
                            file {
                                url
                                contentType
                            }
                        }
                    }
                    stripeImages {
                        title
                        fluid(quality: 100) {
                            ...GatsbyContentfulFluid
                        }
                    }
                    trailerTitle
                    trailerId
                    episodesSectionTitle
                }
                allBuzzsproutPodcastEpisode {
                    nodes {
                        id
                        private
                        buzzsproutId
                        title
                        description
                    }
                }
            }
        `);

    const trailerEpisode =
        allBuzzsproutPodcastEpisode &&
        contentfulPodcastPage &&
        allBuzzsproutPodcastEpisode.nodes.find(
            episode => episode.buzzsproutId === contentfulPodcastPage.trailerId
        );

    return (
        <Layout>
            <PageMetadata
                title={contentfulPodcastPage.metaTitle.metaTitle}
                description={contentfulPodcastPage.metaDescr.metaDescr}
                locale={contentfulPodcastPage.node_locale}
            />

            <MaxWidthContainer>
                <BackgroundStripe>
                    <Section header={true}>
                        <Section.LeftContainer sideOnTop={"right"}>
                            <AstText
                                data={
                                    contentfulPodcastPage.leftHeader
                                        .childMarkdownRemark.htmlAst
                                }
                            />
                            <Box mt={"48px"} mb={2}>
                                <ParagraphTitle>
                                    {contentfulPodcastPage.externalTitle}
                                </ParagraphTitle>
                            </Box>
                            <PlatformContainer>
                                {contentfulPodcastPage.externalPlatforms
                                    .slice(0, 3)
                                    .map(platform => (
                                        <PatformButtonContainer
                                            key={platform.id}
                                        >
                                            <PatformButton {...platform} />
                                        </PatformButtonContainer>
                                    ))}
                                <PatformButtonContainer>
                                    <PatformButton
                                        onClick={() =>
                                            platformRef.current.scrollIntoView()
                                        }
                                        icon={"plus"}
                                    />
                                </PatformButtonContainer>
                            </PlatformContainer>
                        </Section.LeftContainer>
                        <Section.DividerContainer sideOnTop={"right"}>
                            <Divider />
                        </Section.DividerContainer>
                        <Section.RightContainer sideOnTop={"right"}>
                            <FullWidthImage
                                fluid={contentfulPodcastPage.rightImage.fluid}
                                alt={contentfulPodcastPage.rightImage.title}
                            />
                        </Section.RightContainer>
                    </Section>
                </BackgroundStripe>
            </MaxWidthContainer>

            <MaxWidthContainer mb={4} justifyContent={"center"}>
                <Hidden xsDown={true}>
                    <FullWidthImage
                        fluid={contentfulPodcastPage.stripeImages[0].fluid}
                        alt={contentfulPodcastPage.stripeImages[0].title}
                    />
                </Hidden>
                <Hidden xsUp={true}>
                    <FullWidthImage
                        fluid={contentfulPodcastPage.stripeImages[1].fluid}
                        alt={contentfulPodcastPage.stripeImages[1].title}
                    />
                </Hidden>
            </MaxWidthContainer>

            {contentfulPodcastPage.trailerId && trailerEpisode && (
                <MaxWidthContainer mb={4} mt={4}>
                    <PodcastTrailer
                        title={contentfulPodcastPage.trailerTitle}
                        episode={trailerEpisode}
                    />
                </MaxWidthContainer>
            )}

            <BackgroundStripe theme="light">
                <MaxWidthContainer justifyContent={"center"}>
                    <Box width={[1, 0.8]} mt={48}>
                        <Title>
                            {contentfulPodcastPage.episodesSectionTitle}
                        </Title>
                    </Box>

                    {allBuzzsproutPodcastEpisode.nodes.map(
                        episode =>
                            !episode.private &&
                            episode.buzzsproutId !==
                                contentfulPodcastPage.trailerId && (
                                <PodcastEpisode
                                    key={episode.buzzsproutId}
                                    width={[1, 0.8]}
                                    episode={episode}
                                />
                            )
                    )}
                </MaxWidthContainer>
            </BackgroundStripe>

            <MaxWidthContainer
                alignItems={"center"}
                flexDirection={"column"}
                m={4}
            >
                <RefBox ref={platformRef}>
                    <Title center={true}>
                        {contentfulPodcastPage.externalTitle}
                    </Title>
                </RefBox>
                <Box width={[1, 0.8]}>
                    <Flex flexWrap={"wrap"} justifyContent={"center"}>
                        {contentfulPodcastPage.externalPlatforms.map(
                            platform => (
                                <Box m={2} key={platform.id}>
                                    <PatformButton {...platform} />
                                </Box>
                            )
                        )}
                    </Flex>
                </Box>
            </MaxWidthContainer>
        </Layout>
    );
};

export default Podcast;
