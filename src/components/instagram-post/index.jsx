import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const PostImage = styled.img`
    width: 100%;
    height: inherit;
    &>:hover{
        opacity: 0.4;
    }
    display: ${props => props.index < '6' ? "block" : "none"};
    @media (max-width: 1200px) {
        display: ${props => props.index < '5' ? "block" : "none"};
    }
    @media (max-width: 992px) {
        display: ${props => props.index < '4' ? "block" : "none"};
    }
`;

const InstagramPost = ({ node, index }) => {
    return (
        <a target="_blank" href={"https://www.instagram.com/p/" + node.id}>
            <PostImage index={index} src={node.original}/>
        </a>
    );
};

InstagramPost.propTypes = {
    node: PropTypes.object,
    index: PropTypes.number
};

export default InstagramPost;
