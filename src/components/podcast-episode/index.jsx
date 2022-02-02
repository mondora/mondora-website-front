import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import { Flex } from "reflexbox";

import styled from "styled-components";
import Title from "../title";
import SubtleTitle from "../subtle-title";
import Button from "../button";
import HtmlParser from "../html-parser";

const EpisodeContainer = styled.div`
    width: 80%;
    margin: 40px auto;
`;
const EpisodeSubtitle = styled(SubtleTitle)`
    font-size: 18px;
    color: var(--text-dark-gray);
`;
const EpisodeTitle = styled(Title)`
    font-size: 24px;
`;

const PodcastEpisode = ({ episode }) => {
    const { contentfulPodcastPage } = useStaticQuery(graphql`
        query {
            contentfulPodcastPage {
                showMoreButton
            }
        }
    `);

    const [showMore, setShowMore] = useState(episode.description.length < 500);
    const url = `https://www.buzzsprout.com/${process.env.BUZZSPROUT_PODCAST_ID}/${episode.buzzsproutId}?client_source=small_player&iframe=true`;
    const splitTitle = episode.title.split(" - ");

    return (
        <EpisodeContainer>
            <EpisodeTitle>{splitTitle[0]}</EpisodeTitle>
            <EpisodeSubtitle>{splitTitle[1]}</EpisodeSubtitle>
            <iframe
                src={url}
                loading="lazy"
                width="100%"
                height="200"
                frameBorder="0"
                scrolling="no"
                title={episode.title}
            />
            <HtmlParser
                html={
                    showMore
                        ? episode.description
                        : episode.description.substring(0, 250)
                }
            />
            {episode.description.length > 500 && (
                <Flex justifyContent={"center"} m={3}>
                    <Button
                        className="btn"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {contentfulPodcastPage.showMoreButton[showMore ? 1 : 0]}
                    </Button>
                </Flex>
            )}
        </EpisodeContainer>
    );
};

PodcastEpisode.propTypes = {
    episode: PropTypes.object
};

export default PodcastEpisode;
