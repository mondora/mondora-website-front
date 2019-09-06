import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import InstagramPost from "../instagram-post";

import styled from "styled-components";

const FeedWrapper = styled.div`
    margin: 0 auto;
    max-width: 1440px;
    display: grid;
    height: 160px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const InstagramFeed = () => {
    const data = useStaticQuery(graphql`
        query InstagramPosts {
            allInstaNode {
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

    return (
        <FeedWrapper>
            {data.allInstaNode.edges.map((item, i) => {
                console.log(item);
                
                return <InstagramPost key={item.node.id} index={i} node={item.node}></InstagramPost>;
            })}
        </FeedWrapper>
    );
};

export default InstagramFeed;
