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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media (max-width: 1400px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const BlogFeed = () => {
    const data = useStaticQuery(graphql`
        query {
            allMediumPost(sort: { fields: [createdAt], order: DESC }) {
                edges {
                    node {
                        id
                        title
                        virtuals {
                            subtitle
                            previewImage {
                                imageId
                            }
                        }
                        author {
                            name
                        }
                    }
                }
            }
        }
    `);

    return (
        <FeedWrapper>
            {data.allMediumPost.edges.map((item, i) => {
                if(i < 4){
                return <BlogPost index={i} node={item}/>;
                }
            })}
        </FeedWrapper>
    );
};

export default BlogFeed;
