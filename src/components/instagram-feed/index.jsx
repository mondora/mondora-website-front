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

function FilterPosts(post){
    if(post.node.caption.toLowerCase().includes("#tech")){
        return post;
        
    } else{
    return 0;
    }
};

const InstagramFeed = () => {
    const data = useStaticQuery(graphql`
        query InstagramPosts {
            allInstaNode(sort: {order: DESC, fields: timestamp}) {
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