import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import Underline from "../../images/separator.svg";

const DividerSwirl = styled.img.attrs({
    alt: "",
    src: Underline
})`
    width: 150px;
`;
const TrailerContainer = styled.div`
    margin: 64px auto;
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 2fr;

    @media (max-width: 1200px) {
        width: 100%;
    }
    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        margin: 0 auto 48px auto;
    }
`;
const SideContainer = styled.div`
    margin: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    align-self: stretch;
    justify-self: stretch;

    @media (max-width: 960px) {
        align-items: center;
        text-align: center;
    }
`;
const LeftTitle = styled.h1`
    font-size: 72px;
    margin: 8px;
`;

const PodcastTrailer = ({ title, episode }) => {
    const url = `https://www.buzzsprout.com/${process.env.BUZZSPROUT_PODCAST_ID}/${episode.buzzsproutId}?client_source=small_player&iframe=true`;

    return (
        <>
            <TrailerContainer>
                <SideContainer>
                    <LeftTitle>{title}</LeftTitle>
                    <DividerSwirl />
                </SideContainer>
                <SideContainer>
                    <iframe
                        src={url}
                        loading="lazy"
                        width="100%"
                        height="200px"
                        frameBorder="0"
                        scrolling="no"
                        title={episode.title}
                    />
                </SideContainer>
            </TrailerContainer>
        </>
    );
};

PodcastTrailer.propTypes = {
    episode: PropTypes.object,
    title: PropTypes.string
};

export default PodcastTrailer;
