import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import JumboTitle from "../jumbo-title";

import Underline from "../../images/separator.svg";

const DividerSwirl = styled.img.attrs({
    alt: "",
    src: Underline
})`
    margin: auto;
    width: 150px;
`;

const TrailerContainer = styled.div`
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 2fr;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        margin: 0 auto 48px auto;
    }
`;

const SideContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    align-self: stretch;
    justify-self: stretch;
`;

const PodcastTrailer = ({ title, episode }) => {
    const url = `https://www.buzzsprout.com/${process.env.BUZZSPROUT_PODCAST_ID}/${episode.buzzsproutId}?client_source=small_player&iframe=true`;

    return (
        <>
            <DividerSwirl />
            <TrailerContainer>
                <SideContainer>
                    <JumboTitle>{title}</JumboTitle>
                </SideContainer>
                <SideContainer>
                    <iframe
                        src={url}
                        loading="lazy"
                        width="80%"
                        height="200px"
                        frameBorder="0"
                        scrolling="no"
                        title={episode.title}
                    />
                </SideContainer>
            </TrailerContainer>
            <DividerSwirl />
        </>
    );
};

PodcastTrailer.propTypes = {
    episode: PropTypes.object,
    title: PropTypes.string
};

export default PodcastTrailer;
