import React from "react";

import styled from "styled-components";

import { Link } from "gatsby";

import AboutImage from "../../static/images/regions/Japan-icon.png";
import BCorpLogo from "../../static/images/BCorp-logo.png";
import DesignIcon from "../../static/images/design-icon.png";
import DevelopIcon from "../../static/images/develop-icon.png";
import TrainingIcon from "../../static/images/training-icon.png";

import BlogFeed from "../components/blog-feed";
import SquareButton from "../components/square-button";
import Layout from "../components/layout";
import Section from "../components/section";
import Divider from "../components/divider";

const FirstImg = styled.img`
    margin: 80px auto;
`;

const BCorpImg = styled.img`
    display: block;
    width: 80px;
    margin: 24px auto;
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
const Title = styled.h3`
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
const RightAbout = styled.div`
    padding: 32px 64px;
`;
const AboutImg = styled.div`
    width: 100%;
    height: 320px;
    background-image: url(${AboutImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const DescriptionParagraph = styled.p`
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
        <Section gutter={32}>
            <Section.LeftContainer padding={64}>
                <div>
                    <h1>{"We using Software as a Force for Good"}</h1>
                    <DescriptionParagraph>
                        {
                            "mondora is a Società Benefit and certified B Corporation. The mission of the company is to create benefit for all stakeholders through software solutions designed for positive impact. Together with our customers and suppliers we support humans and nature with projects that benefit the community and land."
                        }
                    </DescriptionParagraph>
                </div>
            </Section.LeftContainer>

            <Section.DividerContainer>
                <Divider below />
            </Section.DividerContainer>

            <Section.RightContainer>
                <FirstImg src={AboutImage} />
            </Section.RightContainer>
        </Section>

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
                                <Icon src={item.icon} />
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

        <Section margin={0}>
            <Section.LeftContainer>
                <AboutImg />
            </Section.LeftContainer>

            <Section.DividerContainer>
                <Divider above below={false} />
            </Section.DividerContainer>

            <Section.RightContainer>
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
            </Section.RightContainer>
        </Section>

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
