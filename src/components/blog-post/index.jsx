import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const PostWrapper = styled.a`
    margin: 0 16px;
    height: 100%;
    height: fit-content;
    background-color: var(--white);
    display: block;
    text-align: left;
    text-decoration: none;
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
    height: 200px;
    margin: 0 auto;
    & > :hover {
        opacity: 0.4;
    }
`;
const PostAuthor = styled.div`
    text-transform: uppercase;
    color: var(--border-gray);
    padding: 16px;
    font-size: 8pt;
`;
const PostTitle = styled.div`
    text-decoration: none;
    font-size: 12pt;
    padding: 0 16px;
    color: var(--black);
`;
const PostDescription = styled.div`
    text-decoration: none;
    font-size: 8pt;
    padding: 16px;
    color: var(--text-dark-gray);
`;

const BlogPost = ({ node, index }) => {
    var shortened = node.content.encoded.substring(
        node.content.encoded.search('img alt="" src=') + 16
    );
    var imgFormats = ["png", "jpg", "peg"];
    var end = shortened.length;
    imgFormats.map((format, i) => {
        if (shortened.search(format) > 0)
            end = Math.min(shortened.search(format), end);
    });
    var imgUrl = shortened.substring(0, end + 3);

    return (
        <PostWrapper index={index} target="_blank" href={node.link}>
            <PostImage src={imgUrl} />
            <Divider />
            <PostAuthor>{node.creator}</PostAuthor>
            <PostTitle>{node.title}</PostTitle>
            <PostDescription>{node.pubDate}</PostDescription>
        </PostWrapper>
    );
};

BlogPost.propTypes = {
    node: PropTypes.object,
    index: PropTypes.number
};

export default BlogPost;
