import React from "react";
import PropTypes from "prop-types";

import { useStaticQuery, graphql } from "gatsby";
import { Flex } from "reflexbox";

import Title from "../../../title";
import Subtitle from "../../../subtitle";
import SectionComponent from "../../../section";
import FullWidthImage from "../../../full-width-image";
import BackgroundStripe from "../../../background-stripe";
import MaxWidthContainer from "../../../max-width-container";
import SubtleTitle from "../../../subtle-title";

export const Section = ({
    image,
    miniTitle,
    title,
    subtitle,
    voices,
    dark,
    additionalText
}) => {
    const { underlinesImage } = useStaticQuery(graphql`
        query {
            underlinesImage: file(relativePath: { eq: "underlines.svg" }) {
                publicURL
            }
        }
    `);

    return (
        <BackgroundStripe theme={dark ? "dark" : "light"}>
            <MaxWidthContainer>
                <SectionComponent>
                    <SectionComponent.LeftContainer>
                        <FullWidthImage fluid={image} />
                    </SectionComponent.LeftContainer>

                    <SectionComponent.RightContainer>
                        <SubtleTitle light={dark}>{miniTitle}</SubtleTitle>

                        <Title light={dark}>{title}</Title>

                        <Subtitle light={dark}>{subtitle}</Subtitle>
                    </SectionComponent.RightContainer>
                </SectionComponent>

                <FullWidthImage fluid={underlinesImage.publicURL} />

                <Flex flexWrap="wrap" padding={-2}>
                    {voices.map(({ title, description }, index) => (
                        <Flex
                            width={[1, 1 / 3]}
                            flexDirection="column"
                            key={index}
                            padding={2}
                        >
                            <Title light={dark}>{title}</Title>
                            <Subtitle light={dark}>{description}</Subtitle>
                        </Flex>
                    ))}
                </Flex>

                <Flex width={1} margin={4} textAlign="center">
                    <Subtitle light={dark}>{additionalText}</Subtitle>
                </Flex>
            </MaxWidthContainer>
        </BackgroundStripe>
    );
};

Section.propTypes = {
    rightImage: PropTypes.bool,
    image: PropTypes.object.isRequired,
    miniTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    voices: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired,
    dark: PropTypes.bool,
    additionalText: PropTypes.node
};
