import React, { useRef } from "react";

import { graphql, useStaticQuery } from "gatsby";
import { Box, Flex } from "reflexbox";
import styled from "styled-components";

import { theme } from "../../styles/theme";
import Layout from "../../components/layout";
import FullWidthImage from "../../components/full-width-image";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";
import PodcastEpisode from "../../components/podcast-episode";
import Title from "../../components/title";
import BackgroundStripe from "../../components/background-stripe";
import SocialLink from "../../components/social-link";
import Section from "../../components/section";
import Divider from "../../components/divider";
import AstText from "../../components/ast-text";
import ParagraphTitle from "../../components/paragraph-title";

const PatformButtonContainer = styled(Box).attrs({
    mr: [0, 3],
    mb: 3,
    width: "fit-content"
})``;
const PatformButton = styled(SocialLink).attrs({
    size: 24,
    theme: "dark"
})``;

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
    const stripeImage =
        contentfulPodcastPage.stripeImages[
            typeof window !== "undefined" &&
            window.innerWidth > theme.breakpoints[1]
                ? 0
                : 1
        ];

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
                            <Flex
                                flexDirection={["column", "row"]}
                                justifyContent={["center", "start"]}
                                alignItems={"center"}
                            >
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
                            </Flex>
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
                <FullWidthImage
                    fluid={stripeImage.fluid}
                    alt={stripeImage.title}
                />
            </MaxWidthContainer>
            <BackgroundStripe theme="light">
                <MaxWidthContainer justifyContent={"center"}>
                    <Box width={[1, 0.8]} mt={48}>
                        <Title>
                            {contentfulPodcastPage.episodesSectionTitle}
                        </Title>
                    </Box>
                    {allBuzzsproutPodcastEpisode.nodes.map(
                        episode =>
                            !episode.private && (
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
                <Box m={2} ref={platformRef}>
                    <Title>{contentfulPodcastPage.externalTitle}</Title>
                </Box>
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
