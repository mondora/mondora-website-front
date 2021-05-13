import React from "react";
import PropTypes from "prop-types";

import { Flex } from "reflexbox";

import Title from "../../../title";
import Subtitle from "../../../subtitle";
import SectionComponent from "../../../section";
import FullWidthImage from "../../../full-width-image";
import BackgroundStripe from "../../../background-stripe";
import MaxWidthContainer from "../../../max-width-container";
import SubtleTitle from "../../../subtle-title";
import SwirlSeparator from "../../../swirl-separator";

import Voice from "../voice";

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
                                    variant={section.darkTheme ? "light" : ""}
                                >
                                    {section.description.description}
                                </Subtitle>
                                <SwirlSeparator width={"20%"} />
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
                                    variant={section.darkTheme ? "light" : ""}
                                >
                                    {section.description.description}
                                </Subtitle>
                                <SwirlSeparator width={"20%"} />
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
                    <Subtitle variant={section.darkTheme ? "light" : ""}>
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
