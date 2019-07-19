import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import InstagramPost from "../instagram-post";

import styled from "styled-components";

const FeedWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: 160px;
`;

const InstagramFeed = () => {
    const data = useStaticQuery(graphql`
        query InstagramPosts {
            allInstaNode {
                edges {
                    node {
                        id
                        likes
                        comments
                        mediaType
                        preview
                        original
                        timestamp
                        caption
                    }
                }
            }
        }
    `);

    return (
        <FeedWrapper>
            {data.allInstaNode.edges.map((item, i) => {
                //console.log(item);
                return <InstagramPost node={item.node}></InstagramPost>;
            })}
        </FeedWrapper>
    );
};

export default InstagramFeed;
