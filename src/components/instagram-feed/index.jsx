import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import InstagramPost from "../instagram-post";

import styled from "styled-components";

const FeedWrapper = styled.div`
    margin: 0 auto;
    max-width: 1440px;
    display: grid;
    padding-top: 80px;
    grid-template-columns: 20% 20% 20% 20% 20%;

    @media (max-width: 768px) {
        grid-template-columns: 25% 25% 25% 25%;
    }

    @media (max-width: 500px) {
        grid-template-columns: 50% 50%;
    }
`;

function FilterPosts(post) {
    if (post.node.caption.toLowerCase().includes("#tech")) {
        return post;
    } else {
        return 0;
    }
}

const InstagramFeed = () => {
    const data = useStaticQuery(graphql`
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
    `);
    var posts = data.allInstaNode.edges.filter(FilterPosts);
    return (
        <FeedWrapper>
            {posts.map((item, i) => {
                return (
                    <InstagramPost
                        key={item.node.id}
                        index={i}
                        node={item.node}
                    ></InstagramPost>
                );
            })}
        </FeedWrapper>
    );
};

export default InstagramFeed;
