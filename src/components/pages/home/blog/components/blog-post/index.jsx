import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const PostWrapper = styled.a`
    margin: 16px;
    background-color: var(--white);
    display: block;
    text-align: left;
    text-decoration: none;
    font-size: 12px;
    cursor: pointer;
`;

const Divider = styled.div`
    background-color: var(--primary);
    width: 100%;
    margin: 0;
    padding: 0;
    height: 8px;
`;

const PostImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 192px;
`;

const PostCreator = styled.div`
    text-transform: uppercase;
    color: var(--border-gray);
    padding: 16px;
`;

const PostTitle = styled.div`
    min-height: 64px;
    font-size: 12pt;
    padding: 0 16px;
    color: var(--black);
`;

const PostPubDate = styled.div`
    padding: 16px;
    color: var(--text-dark-gray);
`;

const BlogPost = ({ node }) => {
    const shortened = node.content.encoded.substring(
        node.content.encoded.search('img alt="" src=') + 16
    );
    const imgUrl = shortened.substring(0, shortened.search('"'));

    return (
        <PostWrapper target="_blank" href={node.link} rel="noopener noreferrer">
            <PostImage src={imgUrl} alt="" />
            <Divider />
            <PostCreator>{node.creator}</PostCreator>
            <PostTitle>{node.title}</PostTitle>
            <PostPubDate>{node.pubDate}</PostPubDate>
        </PostWrapper>
    );
};

BlogPost.propTypes = {
    node: PropTypes.object,
    index: PropTypes.number
};

export default BlogPost;
