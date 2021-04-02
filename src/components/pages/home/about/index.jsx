import React from "react";

import PropTypes from "prop-types";

import { Box } from "reflexbox";

import Title from "../../../title";
import FullWidthImage from "../../../full-width-image";
import BackgroundStripe from "../../../background-stripe";
import MaxWidthContainer from "../../../max-width-container";
import Section from "../../../section";
import Subtitle from "../../../subtitle";
import Button from "../../../button";

const About = ({ data }) => (
    <BackgroundStripe theme="dark">
        <MaxWidthContainer>
            <Section>
                <Section.LeftContainer sideOnTop="left">
                    <FullWidthImage
                        fluid={data.graphic.fluid}
                        alt={data.graphic.title}
                    />
                </Section.LeftContainer>
                <Section.RightContainer sideOnTop="left">
                    <Box my={48}>
                        <Title light={true}>{data.sectionName}</Title>
                        <Subtitle light={true} margin="32px 0">
                            {data.description.description}
                        </Subtitle>
                        <Button to={data.button.link}>
                            {data.button.text}
                        </Button>
                    </Box>
                </Section.RightContainer>
            </Section>
        </MaxWidthContainer>
    </BackgroundStripe>
);

About.propTypes = {
    data: PropTypes.object
};

export default About;
