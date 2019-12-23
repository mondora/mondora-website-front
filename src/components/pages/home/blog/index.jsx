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

    const settings = {
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <BackgroundStripe theme="light">
            <MaxWidthContainer justifyContent="center">
                <Title>From our blog</Title>
            </MaxWidthContainer>

            <Carousel {...settings}>
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
