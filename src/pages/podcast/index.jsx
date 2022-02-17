import React from "react";

import { graphql, useStaticQuery } from "gatsby";
import { Box } from "reflexbox";

import Layout from "../../components/layout";
import Header from "../../components/header";
import FullWidthImage from "../../components/full-width-image";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";
import PodcastEpisode from "../../components/podcast-episode";
import Title from "../../components/title";
import BackgroundStripe from "../../components/background-stripe";
import SocialLink from "../../components/social-link";

const Podcast = () => {
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
                    stripeImage {
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

    return (
        <Layout>
            <PageMetadata
                title={contentfulPodcastPage.metaTitle.metaTitle}
                description={contentfulPodcastPage.metaDescr.metaDescr}
                locale={contentfulPodcastPage.node_locale}
            />
            <Header
                left={
                    contentfulPodcastPage.leftHeader.childMarkdownRemark.htmlAst
                }
                rightImage={contentfulPodcastPage.rightImage}
            />
            <MaxWidthContainer mb={4} justifyContent={"center"}>
                {contentfulPodcastPage.externalPlatforms.map(platform => (
                    <Box m={2} key={platform.id}>
                        <SocialLink {...platform} size={24} theme={"dark"} />
                    </Box>
                ))}
                <FullWidthImage
                    fluid={contentfulPodcastPage.stripeImage.fluid}
                    alt={contentfulPodcastPage.stripeImage.title}
                />
            </MaxWidthContainer>
            <BackgroundStripe theme="light">
                <MaxWidthContainer justifyContent={"center"}>
                    <Box width={[1, 0.8]} mt={48} mb={24}>
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
        </Layout>
    );
};

export default Podcast;
