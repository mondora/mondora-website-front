import React from "react";

import styled from "styled-components";

import Layout from "../../components/layout";
import InstagramFeed from "../../components/instagram-feed";
import Section from "../../components/section";
import Divider from "../../components/divider";

import Underline from "../../../static/images/underline-swirl.png";
import Image from "../../../static/images/about-us-1.png";

const LeftParagraph = styled.div`
    @media (max-width: 992px) {
        text-align: center;
    }
`;

const LeftTitle = styled.h1`
    margin-top: 16px;
`;

const LeftContent = styled.div`
    color: var(--text-gray);

    @media (max-width: 992px) {
        margin: 24px auto;
    }
`;

const RightTitle = styled.h1`
    font-size: 80pt;
    text-align: center;
`;

const AboutSection = styled.div`
    background-color: ${props => props.color};
    width: 90%;
    padding: 24px 5% 40px 5%;
    min-height: 200px;
`;
const AboutWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 16px 24px 16px;
`;
const AboutTitle = styled.h1`
    margin-top: 80px;
`;
const AboutParagraph = styled.div`
    color: var(--text-gray);
    line-height: 1.5;
`;
const AboutDivider = styled.img`
    width: 25%;
    margin-top: 24px;
    min-width: 120px;
`;
const FeaturesContainer = styled.div`
    margin: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 32px;
`;
const AboutImage = styled.img`
    width: 80%;
    margin: 0 40px;
`;
const FeatureTitle = styled.div`
    font-size: 14pt;
`;
const FeatureText = styled.div`
    color: var(--border-gray);
    line-height: 1.5;
    margin-top: 16px;
`;

const AboutFeatures = [
    {
        title: "Our Methodologies",
        text:
            "We have been working with Agile Methodologies and Scrum since 2002 and many of us have Scrum Master and Product Owner certifications as well as being expert Scrum Developers - which means we are able to navigate complex projects and reach amazing results by collaborating with you!"
    },
    {
        title: "Innovative technologies",
        text:
            "As a team, we have been developing Cloud applications since 2007 and have gained valuable experience in these past years of work. We are strongly focused on innovation and emerging technologies and are always eager to test new things… and celebrate with a party when we fail  ;)"
    },
    {
        title: "Structure",
        text:
            "Keeping in mind that we are a self-managed, flat structured B Corporation (that’s a lot of stuff) we cannot develop solutions that don’t make an impact, so Benefit by Design is a must-have in all our applications.. as well as opting for Open Source as often as we can. "
    }
];
const About = () => (
    <Layout>
        <Section gutter={32}>
            <Section.LeftContainer>
                <LeftParagraph>
                    <LeftTitle>
                        {
                            "We Design and Build Software that generates Positive Impact"
                        }
                    </LeftTitle>
                    <LeftContent>
                        {
                            "mondora is a software and advisory company specialising in custom cloud solutions for all kinds of businesses. "
                        }
                    </LeftContent>
                </LeftParagraph>
            </Section.LeftContainer>

            <Section.DividerContainer>
                <Divider />
            </Section.DividerContainer>

            <Section.RightContainer>
                <RightTitle>
                    {"BeThe"} <br />
                    {"Change"}
                </RightTitle>
            </Section.RightContainer>
        </Section>

        <AboutSection color={"var(--background-light-gray)"}>
            <AboutWrapper>
                <div>
                    <AboutTitle>{"Mondora, a really diverse group"}</AboutTitle>
                    <AboutParagraph>
                        {
                            "We are a passionate and dedicated team of over 60 Full-Stack Software Developers, UX Designers, System Administrators… and a few Farmers!"
                        }
                    </AboutParagraph>
                    <AboutDivider src={Underline} />
                </div>
                <AboutImage src={Image} />
            </AboutWrapper>
            <FeaturesContainer>
                {AboutFeatures.map(feature => (
                    <div>
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureText>{feature.text}</FeatureText>
                    </div>
                ))}
            </FeaturesContainer>
        </AboutSection>

        <InstagramFeed />
    </Layout>
);

export default About;
