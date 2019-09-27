import React from "react";

import styled from "styled-components";

import { Link } from "gatsby";

import TitleImage from "../../static/images/mondora.png";
import ImpactsImage from "../../static/images/impacts.png";
import BCorpLogo from "../../static/images/BCorp-logo.png";
import AboutImage from "../../static/images/brothers.png";
import DarkBackground from "../components/layout/assets/dark_background.svg";
import LightBackground from "../components/layout/assets/light_background.svg";

import BlogFeed from "../components/blog-feed";
import SquareButton from "../components/square-button";
import Layout from "../components/layout";
import Section from "../components/section";
import Divider from "../components/divider";

const FirstImg = styled.img`
    width: 30vw;

    @media (max-width: 768px) {
        width: 70vw;
    }
`;

const BCorpImg = styled.img`
    width: 80px;
    grid-area: 2 / 2;

    @media (max-width: 768px) {
        grid-area: 4 / 1 / 5 / 1;
        margin: 0 auto;
    }
`;

const WhatContainer = styled.div`
    max-width: 1440px;
    margin: 24px auto;
    text-align: center;
`;
const WhatSubtitle = styled.div`
    width: 80%;
    margin: 0 auto 40px auto;
    color: var(--variant-black);
    font-size: 11pt;
    line-height: 1.2;
`;
const WhatItemsContainer = styled.div`
    display: flex;

    @media (max-width: 992px) {
        flex-direction: column;
    }
`;
const WhatItem = styled.div`
    text-align: left;
    padding: 24px;

    @media (max-width: 768px) {
        text-align: center;
    }
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;
const Title = styled.h3`
    font-size: 18px;
    font-weight: bold;
`;
const Description = styled.div`
    line-height: 1.5;
    font-size: 14px;
`;
const SuperA = styled.a`
    text-decoration: none;
`;

const BenefitProject = styled.div`
    padding: 0px 36px;

    @media (max-width: 768px) {
        padding-bottom: 37px;
    }
`;

const BenefitImageContainer = styled.div`
    text-align: center;
    padding-bottom: 86px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const BenefitImage = styled.img`
    width: 66vw;
`;
const DescriptionParagraph = styled.p`
    color: var(--text-dark-gray);
    margin: 24px 0;
    line-height: 1.5;
`;

const AboutContainer = styled.div`
    max-width: 1440px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    @media (max-width: 768px) {
        text-align: left;
        grid-template-columns: initial;
    }
`;

const AboutSection = styled.div`
    padding-bottom: 124px;
    padding-top: 94px;
    background-image: url(${DarkBackground});
    background-position: center;
    background-size: cover;

    @media (max-width: 768px) {
        text-align: left;
        grid-template-columns: initial;
    }
`;

const AboutTitle = styled.h1`
    color: var(--white);
`;

const AboutParagraph = styled.p`
    color: var(--white);
    margin: 24px 0;
    line-height: 1.5;
`;

const BlogContainer = styled.div`
    padding: 40px 0;
    text-align: center;
    height: fit-content;
    background-image: url(${LightBackground});
`;

const whatItems = [
    {
        title: "Failure party",
        description:
            "We are a team of explorers who are allowed to have Failure Parties when we try to learn something new and mess up."
    },
    {
        title: "Passions",
        description:
            "This mix of qualities and passions allows us to push boundaries and keep learning and innovating. So if you have a challenging project for us… bring it on!"
    },
    {
        title: "Experimenting",
        description:
            "Right now we are experimenting with, and would like to work more on: Machine Learning, Artificial Intelligence, Augmented Reality, Blockchain Technology...and more"
    }
];

const Homepage = () => {
    return (
        <Layout>
            <Section gutter={32} margin={"auto"}>
                <Section.LeftContainer>
                    <div>
                        <h1>{"Welcome to the :mondora world!"}</h1>
                        <DescriptionParagraph>
                            {
                                "Our aim is to create benefit for all stakeholders by designing and building software solutions that maximise positive impact. Together with our customers and suppliers, we support humans and nature with projects that benefit the community and land."
                            }
                        </DescriptionParagraph>
                    </div>
                </Section.LeftContainer>

                <Section.DividerContainer>
                    <Divider below />
                </Section.DividerContainer>

                <Section.RightContainer>
                    <FirstImg src={TitleImage} />
                </Section.RightContainer>
                <BCorpImg src={BCorpLogo} />
            </Section>

            <WhatContainer>
                <h1>{"What we can do for you"}</h1>
                <WhatSubtitle>
                    {
                        "Our aim is to create benefit for all stakeholders through software solutions designed for positive impact. Together with our customers and suppliers, we support humans and nature with projects that benefit the community and land."
                    }
                </WhatSubtitle>
                <WhatItemsContainer>
                    {whatItems.map((item, key) => {
                        return (
                            <WhatItem key={key}>
                                <TitleContainer>
                                    <Title>{item.title}</Title>
                                </TitleContainer>
                                <Description>{item.description}</Description>
                            </WhatItem>
                        );
                    })}
                </WhatItemsContainer>
                <Link to={"/about"}>
                    <SquareButton>{"SERVICES"}</SquareButton>
                </Link>
            </WhatContainer>

            <BlogContainer>
                <h1>{"From our blog"}</h1>
                <BlogFeed />
                <SuperA target="_blank" href={"https://bcalmbcorp.com/"}>
                    <SquareButton>{"visit our blog"}</SquareButton>
                </SuperA>
            </BlogContainer>

            <Section margin={"auto"}>
                <Section.DividerContainer>
                    <Divider below hideOnMobile={true} />
                </Section.DividerContainer>

                <Section.RightContainer>
                    <BenefitProject>
                        <h1>{"Benefit Project"}</h1>
                        <DescriptionParagraph>
                            {
                                "We are  a team of open-minded and kind people who always offer each other help to overcome obstacles and create cutting edge solutions to problems."
                            }
                        </DescriptionParagraph>
                        <Link to={"/bcorp"}>
                            <SquareButton>{"IMPACT"}</SquareButton>
                        </Link>
                    </BenefitProject>
                </Section.RightContainer>
            </Section>

            <BenefitImageContainer>
                <BenefitImage src={ImpactsImage} />
            </BenefitImageContainer>

            <AboutSection>
                <AboutContainer>
                    <Section.LeftContainer>
                        <FirstImg src={AboutImage} />
                    </Section.LeftContainer>

                    <Section.RightContainer>
                        <AboutTitle>{"About Mondora"}</AboutTitle>
                        <AboutParagraph>
                            {
                                "We are  a team of open-minded and kind people who always offer each other help to overcome obstacles and create cutting edge solutions to problems."
                            }
                        </AboutParagraph>
                    </Section.RightContainer>
                </AboutContainer>
            </AboutSection>
        </Layout>
    );
};

export default Homepage;
