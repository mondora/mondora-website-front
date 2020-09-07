import React from "react";

import PropTypes from "prop-types";
import { Link } from "gatsby";

import { Box } from "reflexbox";

import Divider from "../../../divider";
import FullWidthImage from "../../../full-width-image";
import Section from "../../../section";
import MaxWidthContainer from "../../../max-width-container";
import Subtitle from "../../../subtitle";
import Title from "../../../title";
import SquareButton from "../../../square-button";

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
                    <Link to={data.button.link}>
                        <SquareButton>{data.button.text}</SquareButton>
                    </Link>
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
