import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import BackgroundStripe from "../../../background-stripe";
import Carousel from "../../../carousel";
import MaxWidthContainer from "../../../max-width-container";
import SquareButton from "../../../square-button";
import Title from "../../../title";

import BlogPost from "./components/blog-post";

const Blog = () => {
    const { allFeedBcalmBcorp } = useStaticQuery(graphql`
        query {
            allFeedBcalmBcorp {
                nodes {
                    id
                    title
                    link
                    creator
                    pubDate
                    content {
                        encoded
                    }
                }
            }
        }
    `);

    return (
        <BackgroundStripe theme="light">
            <MaxWidthContainer justifyContent="center">
                <Title>From our blog</Title>
            </MaxWidthContainer>

            <Carousel>
                {allFeedBcalmBcorp.nodes.map(blogPost => (
                    <BlogPost key={blogPost.id} node={blogPost} />
                ))}
            </Carousel>

            <MaxWidthContainer justifyContent="center">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://bcalmbcorp.com/"
                >
                    <SquareButton>{"Visit our blog"}</SquareButton>
                </a>
            </MaxWidthContainer>
        </BackgroundStripe>
    );
};

export default Blog;
