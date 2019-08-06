import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const PostWrapper = styled.a`
    margin: 0 16px;
    height: 100%;
    height: fit-content;
    background-color: var(--white);
    
    @media (max-width: 1400px) {
        display: ${props => (props.index < "3" ? "block" : "none")};
    }
    @media (max-width: 992px) {
        display: ${props => (props.index < "2" ? "block" : "none")};
    }
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
    width: 100%;
    margin: 0;
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
    //console.log(index);
    //console.log(node);
    return (
        <PostWrapper
            index={index}
            // href={"https://medium.com/@mondora/" + node.node.id}
        >
            <PostImage
                src={
                    "https://cdn-images-1.medium.com/max/800/" +
                    node.node.virtuals.previewImage.imageId
                }
            />
            <Divider />
            <PostAuthor>{node.node.author.name}</PostAuthor>
            <PostTitle>{node.node.title}</PostTitle>
            <PostDescription>{node.node.virtuals.subtitle}</PostDescription>
        </PostWrapper>
    );
};

BlogPost.propTypes = {
    node: PropTypes.object,
    index: PropTypes.number
};

export default BlogPost;
