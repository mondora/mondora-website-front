import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const PostImage = styled.div`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 240px;
    height: 240px;
    transition: opacity 0.3s ease-in-out;
    & :hover {
        opacity: 0.5;
    }
`;

export const InstagramPost = ({ src, id }) => {
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.instagram.com/p/${id}`}
        >
            <PostImage src={src} />
        </a>
    );
};

InstagramPost.propTypes = {
    src: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
};
