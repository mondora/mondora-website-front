import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import Image from "gatsby-image";

import FullWidthImage from "../../components/full-width-image";

const TrailerVideo = styled.video.attrs({
    autoPlay: true,
    loop: true,
    muted: true
})`
    width: 100%;
    margin: auto;
`;
const VideoContainer = styled.div`
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
`;
const Logo = styled(Image)`
    margin: 24px auto;
    width: 50px;
`;

const PodcastVideo = ({ image, video, logo }) => {
    const [timedOut, setTimedOut] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimedOut(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <VideoContainer>
            {timedOut ? (
                <TrailerVideo>
                    <source
                        src={`https:${video.file.url}`}
                        type={video.file.contentType}
                    />
                </TrailerVideo>
            ) : (
                <FullWidthImage fluid={image.fluid} alt={image.title} />
            )}
            <Logo fixed={logo.fixed} alt={logo.title}/>
        </VideoContainer>
    );
};

PodcastVideo.propTypes = {
    image: PropTypes.object,
    video: PropTypes.object,
    logo: PropTypes.object
};

export default PodcastVideo;
