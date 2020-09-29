import React from "react";

import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Header from "../components/header";
import Carousel from "../components/carousel";
import BackgroundStripe from "../components/background-stripe";

const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    centerMode: true,
    centerPadding: "60px"
};

const RegionTemplate = ({ data }) => (
    <Layout>
        <Header
            left={data.contentfulRegion.leftHeader.childMarkdownRemark.htmlAst}
            leftButton={data.contentfulRegion.returnButton}
            rightImage={data.contentfulRegion.graphic}
        />
        <BackgroundStripe theme={"light"}>
            <Carousel {...settings}>
                {data.contentfulRegion.people.map((person, i) => (
                    <div key={i}> {person.name}</div>
                ))}
            </Carousel>
        </BackgroundStripe>
    </Layout>
);

RegionTemplate.propTypes = {
    data: PropTypes.object
};

export default RegionTemplate;

export const query = graphql`
    query($slug: String!) {
        contentfulRegion(slug: { eq: $slug }) {
            name
            leftHeader {
                childMarkdownRemark {
                    htmlAst
                }
            }
            graphic {
                title
                fluid(quality: 100) {
                    ...GatsbyContentfulFluid
                }
            }
            returnButton {
                text
                link
            }
            people {
                name
            }
        }
    }
`;
