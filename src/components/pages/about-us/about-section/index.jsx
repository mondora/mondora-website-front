import React from "react";
import PropTypes from "prop-types";

import { Flex } from "reflexbox";
import styled from "styled-components";

import Title from "../../../title";
import Subtitle from "../../../subtitle";
import SectionComponent from "../../../section";
import FullWidthImage from "../../../full-width-image";
import BackgroundStripe from "../../../background-stripe";
import MaxWidthContainer from "../../../max-width-container";
import SubtleTitle from "../../../subtle-title";

import Voice from "../voice";

import Underline from "../../../../images/separator.svg";

const DividerSwirl = styled.img`
    width: 20%;
`;

export const AboutSection = ({ section }) => {
    return (
        <BackgroundStripe theme={section.darkTheme ? "dark" : "light"}>
            <MaxWidthContainer>
                <SectionComponent>
                    {section.imageRight ? (
                        <>
                            <SectionComponent.LeftContainer>
                                <SubtleTitle light={section.darkTheme}>
                                    {section.sectionName}
                                </SubtleTitle>

                                <Title light={section.darkTheme}>
                                    {section.title}
                                </Title>

                                <Subtitle
                                    margin={"24px 0"}
                                    light={section.darkTheme}
                                >
                                    {section.description.description}
                                </Subtitle>
                                <DividerSwirl src={Underline} />
                            </SectionComponent.LeftContainer>
                            <SectionComponent.RightContainer>
                                <FullWidthImage
                                    fluid={section.graphic.fluid}
                                    alt={section.graphic.title}
                                />
                            </SectionComponent.RightContainer>
                        </>
                    ) : (
                        <>
                            <SectionComponent.LeftContainer sideOnTop={"left"}>
                                <FullWidthImage
                                    fluid={section.graphic.fluid}
                                    alt={section.graphic.title}
                                />
                            </SectionComponent.LeftContainer>
                            <SectionComponent.RightContainer sideOnTop={"left"}>
                                <SubtleTitle light={section.darkTheme}>
                                    {section.sectionName}
                                </SubtleTitle>

                                <Title light={section.darkTheme}>
                                    {section.title}
                                </Title>

                                <Subtitle
                                    margin={"24px 0"}
                                    light={section.darkTheme}
                                >
                                    {section.description.description}
                                </Subtitle>
                                <DividerSwirl src={Underline} />
                            </SectionComponent.RightContainer>
                        </>
                    )}
                </SectionComponent>

                <Flex flexWrap="wrap" padding={-2}>
                    {section.voices.map((voice, i) => (
                        <Voice
                            key={i}
                            title={voice.title}
                            description={voice.description.description}
                            dark={section.darkTheme}
                        />
                    ))}
                </Flex>

                <Flex width={1} margin={4} textAlign="center">
                    <Subtitle light={section.darkTheme}>
                        {section.subtitle && section.subtitle.subtitle}
                    </Subtitle>
                </Flex>
            </MaxWidthContainer>
        </BackgroundStripe>
    );
};

export default AboutSection;

AboutSection.propTypes = {
    section: PropTypes.object
};
