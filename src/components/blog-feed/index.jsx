import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Slider from "react-slick";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

import BlogPost from "../blog-post";
import MaxWidthContainer from "../max-width-container";

const Arrow = styled(FontAwesomeIcon)`
    height: 40px;
    font-size: 200px;
    z-index: 3;
    color: var(--text-dark-black);
    transition: 0.1s ease;
    :hover {
        color: var(--primary);
    }
    ::before {
        content: "";
    }
`;

const CustomSlider = styled(Slider)`
    .slick-dots li.slick-active button:before {
        color: var(--primary);
        font-size: 16px;
        opacity: 1;
    }
    .slick-dots li button:before {
        color: var(--gray);
        font-size: 16px;
        opacity: 1;
    }
`;

const FeedWrapper = styled(MaxWidthContainer)`
    margin: 24px auto;
    width: 80vw;
    height: fit-content;
    padding: 16px;
`;

const BlogFeed = () => {
    var slidesNumber = 4;

    const data = useStaticQuery(graphql`
        query {
            allFeedBcalmBcorp {
                edges {
                    node {
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
        }
    `);

    return (
        <FeedWrapper>
            <CustomSlider
                slidesToShow={slidesNumber}
                slidesToScroll={1}
                infinite={true}
                dots={true}
                swipeToSlide={true}
                speed={500}
                nextArrow={<Arrow icon={faAngleRight} />}
                prevArrow={<Arrow icon={faAngleLeft} />}
            >
                {data.allFeedBcalmBcorp.edges.map((item, i) => {
                    if (i < 6) {
                        return <BlogPost key={i} index={i} node={item.node} />;
                    }
                    return null;
                })}
            </CustomSlider>
        </FeedWrapper>
    );
};

export default BlogFeed;
