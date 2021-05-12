import React from "react";

import PropTypes from "prop-types";

import { Box } from "reflexbox";

import Button from "../../../button";
import Divider from "../../../divider";
import FullWidthImage from "../../../full-width-image";
import Section from "../../../section";
import MaxWidthContainer from "../../../max-width-container";
import Subtitle from "../../../subtitle";
import Title from "../../../title";

const Benefit = ({ data }) => (
    <MaxWidthContainer>
        <Section>
            <Section.DividerContainer>
                <Divider hideOnMobile={true} />
            </Section.DividerContainer>
            <Section.RightContainer>
                <Box my={48} backgroundColor="white">
                    <Title>{data.sectionName}</Title>
                    <Subtitle margin="32px 0">
                        {data.description.description}
                    </Subtitle>
                    <Button to={data.button.link}>{data.button.text}</Button>
                </Box>
            </Section.RightContainer>
        </Section>
        <Box width={[0, 1]}>
            <FullWidthImage
                fluid={data.graphic.fluid}
                alt={data.graphic.title}
            />
        </Box>
    </MaxWidthContainer>
);

Benefit.propTypes = {
    data: PropTypes.object
};

export default Benefit;
