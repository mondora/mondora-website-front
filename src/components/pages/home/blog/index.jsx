import React from "react";

import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";

import BackgroundStripe from "../../../background-stripe";
import Button from "../../../button";
import Carousel from "../../../carousel";
import MaxWidthContainer from "../../../max-width-container";
import Title from "../../../title";

import BlogPost from "./components/blog-post";

const Blog = ({ title, button }) => {
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
                    dots: false
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
                <Title>{title}</Title>
            </MaxWidthContainer>

            <Carousel {...settings}>
                {allFeedBcalmBcorp.nodes.map(blogPost => (
                    <BlogPost key={blogPost.id} node={blogPost} />
                ))}
            </Carousel>

            <MaxWidthContainer justifyContent="center">
                <Button target="_blank" to={button.link}>
                    {button.text}
                </Button>
            </MaxWidthContainer>
        </BackgroundStripe>
    );
};

Blog.propTypes = {
    title: PropTypes.string,
    button: PropTypes.object
};

export default Blog;
