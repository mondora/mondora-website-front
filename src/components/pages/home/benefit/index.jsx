import React from "react";

import { Link, useStaticQuery, graphql } from "gatsby";

import { Box } from "reflexbox";

import Divider from "../../../divider";
import FullWidthImage from "../../../full-width-image";
import Section from "../../../section";
import MaxWidthContainer from "../../../max-width-container";
import Subtitle from "../../../subtitle";
import Title from "../../../title";
import SquareButton from "../../../square-button";

const Benefit = () => {
    const { impactImage } = useStaticQuery(graphql`
        query {
            impactImage: file(relativePath: { eq: "home/impact.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <MaxWidthContainer>
            <Section>
                <Section.DividerContainer>
                    <Divider hideOnMobile={true} />
                </Section.DividerContainer>
                <Section.RightContainer>
                    <Box my={48} backgroundColor="white">
                        <Title>{"Benefit projects"}</Title>
                        <Subtitle margin="32px 0">
                            {
                                "We are a team of open-minded and kind people who always offer each other help to overcome obstacles and create cutting edge solutions to problems."
                            }
                        </Subtitle>
                        <Link to="/bcorp">
                            <SquareButton>{"IMPACT"}</SquareButton>
                        </Link>
                    </Box>
                </Section.RightContainer>
            </Section>

            <FullWidthImage fluid={impactImage.childImageSharp.fluid} />
        </MaxWidthContainer>
    );
};

export default Benefit;
