import React from "react";

import { Box } from "reflexbox";

import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import Title from "../../../title";
import Subtitle from "../../../subtitle";
import ParagraphTitle from "../../../paragraph-title";
import MaxWidthContainer from "../../../max-width-container";
import BackgroundStripe from "../../../background-stripe";

const WhatWeCanDo = () => {
    const { bCorpImage } = useStaticQuery(graphql`
        query {
            bCorpImage: file(relativePath: { eq: "home/b-corp-logo.png" }) {
                childImageSharp {
                    fixed(width: 80) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (
        <BackgroundStripe>
            <MaxWidthContainer justifyContent="center">
                <Image fixed={bCorpImage.childImageSharp.fixed} />
            </MaxWidthContainer>
            <MaxWidthContainer justifyContent="center" mt={16}>
                <Title>{"What we can do for you"}</Title>
            </MaxWidthContainer>

            <MaxWidthContainer textAlign="center" mt={16}>
                <Subtitle>
                    {
                        "Our aim is to create benefit for all stakeholders through software solutions designed for positive impact. Together with our customers and suppliers, we support humans and nature with projects that benefit the community and land."
                    }
                </Subtitle>
            </MaxWidthContainer>

            <MaxWidthContainer my={32}>
                <Box width={[1, 1, 1 / 3]}>
                    <ParagraphTitle>{"Failure party"}</ParagraphTitle>
                    <Subtitle>
                        {
                            "We are a team of explorers who are allowed to have failure parties when we try to learn something new and mess up."
                        }
                    </Subtitle>
                </Box>

                <Box width={[1, 1, 1 / 3]} px={[0, 0, 24]}>
                    <ParagraphTitle>{"Passions"}</ParagraphTitle>
                    <Subtitle>
                        {
                            "This mix of qualities and passions allows us to push boundaries and keep learning and innovating. So if you have a challenging project for us… bring it on!"
                        }
                    </Subtitle>
                </Box>

                <Box width={[1, 1, 1 / 3]}>
                    <ParagraphTitle>{"Experimenting"}</ParagraphTitle>
                    <Subtitle>
                        {
                            "Right now we are experimenting with, and would like to work more on: machine learning, artificial intelligence, augmented reality, blockchain...and more"
                        }
                    </Subtitle>
                </Box>
            </MaxWidthContainer>
        </BackgroundStripe>
    );
};

export default WhatWeCanDo;
