import React from "react";

import styled from "styled-components";

import Layout from "../components/layout";

import { Link } from "gatsby";

import AboutImage from "../../static/images/regions/Japan-icon.png";
import BCorpLogo from "../../static/images/BCorp-logo.png";
import DesignIcon from "../../static/images/design-icon.png";
import DevelopIcon from "../../static/images/develop-icon.png";
import TrainingIcon from "../../static/images/training-icon.png";

import BlogFeed from "../components/blog-feed";
import SquareButton from "../components/square-button";

const FirstBox = styled.div`
    padding: 0;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: 1fr 2px 1fr;
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
        padding: 8px;
    }
`;
const FirstLeft = styled.div`
    width: 80%;
    margin: 40px 10%;
`;
const FirstImg = styled.img`
    margin: 80px 20%;
    width: 60%;
`;
const Divider = styled.div`
    height: 100%;
    width: 100%;
    overflow: visible;
`;
const Line = styled.div`
    border: 1px solid var(--black);
    @media (min-width: 992px) {
        margin: 0 auto;
        width: 0;
        height: 90%;
    }
    @media (max-width: 992px) {
        margin: 24px 10%;
        height: 0;
        width: 80%;
    }
`;
const Circle = styled.div`
    border: 2px solid var(--black);
    width: 28px;
    border-radius: 100%;
    height: 28px;
    position: relative;
    left: -15px;
    @media (max-width: 992px) {
        display: none;
    }
`;

const BCorpImg = styled.img`
    display: block;
    width: 80px;
    margin: 24px auto;
`;

const WhatContainer = styled.div`
    width: 90%;
    max-width: 1440px;
    margin: 0 auto;
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
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 16px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const Description = styled.div`
    line-height: 1.5;
    font-size: 14px;
`;
const SuperA = styled.a`
    text-decoration: none;
`;
const AboutContainer = styled.div`
    padding: 0;
    margin: 40px 0 80px 0;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 2px 1fr;
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
        padding: 8px;
    }
`;
const LeftAbout = styled.div``;
const RightAbout = styled.div`
    background-color: var(--gray);
    padding: 24px;
    margin: 40px 0;
`;
const AboutImg = styled.img`
    margin: 40px 0;
    width: 100%;
`;
const DescriptionParagraph = styled.p`
    width: 100%;
    color: var(--text-dark-gray);
    margin: 24px 0;
    line-height: 1.5;
`;
const BlogContainer = styled.div`
    padding: 40px 0 40px 0;
    background-color: var(--gray);
    text-align: center;
    height: fit-content;
`;

const whatItems = [
    {
        icon: DesignIcon,
        title: "Design / Image",
        description:
            "Our aim is to create benefit for all stakeholders through software solutions designed for positive impact. Together with our customers and suppliers, we support humans and nature with projects that benefit the community and land."
    },
    {
        icon: DevelopIcon,
        title: "Develop & ship",
        description:
            "Shaping new ideas, using open tecnologies, and contributing opensource in our spare time. Reduce your costs while increasing the reliability and quality of your cloud computing experience."
    },
    {
        icon: TrainingIcon,
        title: "Training",
        description:
            "Training is offered throughout Italy, Europe and the world thanks to mondora.com. Whether you are looking for introductory or advanced training on our courses are just what you need."
    }
];

const Homepage = () => (
    <Layout>
        <FirstBox>
            <FirstLeft>
                <h1>{"We using Software as a Force for Good"}</h1>
                <DescriptionParagraph>
                    {
                        "mondora is a Società Benefit and certified B Corporation. The mission of the company is to create benefit for all stakeholders through software solutions designed for positive impact. Together with our customers and suppliers we support humans and nature with projects that benefit the community and land."
                    }
                </DescriptionParagraph>
            </FirstLeft>
            <Divider>
                <Line></Line>
                <Circle></Circle>
            </Divider>
            <FirstImg src={AboutImage}/>
        </FirstBox>
        <BCorpImg src={BCorpLogo} />
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
                                <Icon src={item.icon}/>
                                <Title>{item.title}</Title>
                            </TitleContainer>
                            <Description>{item.description}</Description>
                        </WhatItem>
                    );
                })}
            </WhatItemsContainer>
            <Link to={"/about"}>
                <SquareButton>{"Services"}</SquareButton>
            </Link>
        </WhatContainer>
        <AboutContainer>
            <LeftAbout>
                <AboutImg src={AboutImage} />
            </LeftAbout>
            <Divider>
                <Circle />
                <Line />
                <Circle />
            </Divider>
            <RightAbout>
                <h1>{"About mondora"}</h1>
                <DescriptionParagraph>
                    {
                        "mondora is a software and advisory company specialising in custom cloud solutions for all kinds of businesses."
                    }
                </DescriptionParagraph>
                <DescriptionParagraph>
                    {
                        "The company is self managed and has been working with Scrum and Agile methodologies since 2002."
                    }
                </DescriptionParagraph>
                <DescriptionParagraph>
                    {
                        "With a strong focus on creating a positive impact for all stakeholders, mondora is the perfect match for any company wishing to use their business as a force for good and bring positive change to the world."
                    }
                </DescriptionParagraph>
                <Link to={"/about"}>
                    <SquareButton>{"About Us"}</SquareButton>
                </Link>
            </RightAbout>
        </AboutContainer>
        <BlogContainer>
            <h1>{"From our blog"}</h1>
            <BlogFeed />
            <SuperA href={"https://bcalmbcorp.com/"}>
                <SquareButton>{"visit our blog"}</SquareButton>
            </SuperA>
        </BlogContainer>
    </Layout>
);

export default Homepage;
