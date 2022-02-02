import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Layout from "../../components/layout";
import Header from "../../components/header";
import PageMetadata from "../../components/page-metadata";
import MaxWidthContainer from "../../components/max-width-container";
import PodcastEpisode from "../../components/podcast-episode";
import Title from "../../components/title";

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
                    episodesSectionTitle
                }
                allBuzzsproutPodcastEpisode {
                    nodes {
                        id
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
            <MaxWidthContainer mt={48}>
                <Title>{contentfulPodcastPage.episodesSectionTitle}</Title>
            </MaxWidthContainer>
            <MaxWidthContainer>
                {allBuzzsproutPodcastEpisode.nodes.map(episode => (
                    <PodcastEpisode key={episode.id} episode={episode} />
                ))}
            </MaxWidthContainer>
        </Layout>
    );
};

export default Podcast;
