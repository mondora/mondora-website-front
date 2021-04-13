import React from "react";

import PropTypes from "prop-types";
import { Link } from "gatsby";

import { Box } from "reflexbox";

import Title from "../../../title";
import FullWidthImage from "../../../full-width-image";
import BackgroundStripe from "../../../background-stripe";
import MaxWidthContainer from "../../../max-width-container";
import Section from "../../../section";
import Subtitle from "../../../subtitle";
import SquareButton from "../../../square-button";

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
                        <Subtitle variant={"light"} margin="32px 0">
                            {data.description.description}
                        </Subtitle>
                        <Link to={data.button.link}>
                            <SquareButton>{data.button.text}</SquareButton>
                        </Link>
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
