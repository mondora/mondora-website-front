import React, { memo } from "react";

import { graphql, useStaticQuery } from "gatsby";

import { InstagramPost } from "../instagram-post";

import styled from "styled-components";

const FeedWrapper = styled.div`
    display: flex;
    padding: 0;
    margin: 0;
    height: 240px;
    width: 100vw;
    align-items: flex-start;
    overflow-x: scroll;
`;

const InstagramFeed = memo(() => {
    const posts = useStaticQuery(graphql`
        query InstagramPosts {
            allInstaNode(sort: { order: DESC, fields: timestamp }) {
                edges {
                    node {
                        id
                        likes
                        preview
                        original
                        caption
                    }
                }
            }
        }
    `).allInstaNode.edges;

    return (
        <FeedWrapper>
            {posts.map(({ node: post }) => (
                <InstagramPost key={post.id} src={post.original} id={post.id} />
            ))}
        </FeedWrapper>
    );
});

export default InstagramFeed;
