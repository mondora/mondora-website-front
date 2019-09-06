import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "styled-components";

import BlogPost from "../blog-post";

const FeedWrapper = styled.div`
    margin: 24px auto;
    max-width: 1440px;
    width: 80%;
    display: grid;
    height: fit-content;
    padding: 16px;
    grid-template-columns: 25% 25%  25% 25%;
    @media (max-width: 1400px) {
        grid-template-columns: 33% 33% 33%;
    }
    @media (max-width: 992px) {
        grid-template-columns: 50% 50%;
    }
`;

const BlogFeed = () => {
    const data = useStaticQuery(graphql`
        query {
            allFeedBcalmBcorp {
                edges {
                    node {
                        title,
                        link,
                        creator,
                        pubDate,
                        content{encoded}
                    }
                }
            }
        }
    `);

    return (
        <FeedWrapper>
            {data.allFeedBcalmBcorp.edges.map((item, i) => {
                if(i < 4){
                return <BlogPost index={i} node={item.node}/>;
                }
            })}
        </FeedWrapper>
    );
};

export default BlogFeed;
