import React from "react";

import { Link, useStaticQuery, graphql } from "gatsby";

import { Box } from "reflexbox";

import Title from "../../../title";
import FullWidthImage from "../../../full-width-image";
import BackgroundStripe from "../../../background-stripe";
import MaxWidthContainer from "../../../max-width-container";
import Section from "../../../section";
import Subtitle from "../../../subtitle";
import SquareButton from "../../../square-button";

const About = () => {
    const { brothersImage } = useStaticQuery(graphql`
        query {
            brothersImage: file(relativePath: { eq: "brothers.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <BackgroundStripe theme="dark">
            <MaxWidthContainer>
                <Section>
                    <Section.LeftContainer sideOnTop="left">
                        <FullWidthImage
                            fluid={brothersImage.childImageSharp.fluid}
                        />
                    </Section.LeftContainer>
                    <Section.RightContainer sideOnTop="left">
                        <Box my={48}>
                            <Title light={true}>{"About Mondora"}</Title>
                            <Subtitle light={true} margin="32px 0">
                                {
                                    "We are a team of open-minded and kind people who always offer each other help to overcome obstacles and create cutting edge solutions to problems."
                                }
                            </Subtitle>
                            <Link to="/about">
                                <SquareButton>{"ABOUT US"}</SquareButton>
                            </Link>
                        </Box>
                    </Section.RightContainer>
                </Section>
            </MaxWidthContainer>
        </BackgroundStripe>
    );
};

export default About;
