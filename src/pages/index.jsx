import React from "react";

import styled from "styled-components";

import Layout from "../components/layout";

const FirstBox = styled.div`
    padding: 0 64px;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: 1fr 32px 1fr;
    grid-column-gap: 16px;
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
        padding: 8px;
    }
`;

const Divider = styled.div`
    height: 100%;
    width: 100%;
`;
const Line = styled.div`
    border: 2px solid black;
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
    border: 2px solid black;
    width: 28px;
    border-radius: 100%;
    height: 28px;
    @media (max-width: 992px) {
        display: none;
    }
`;

const BCorpLogo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const WhatContainer = styled.div`
    text-align: center;
`;

const WhatItemsContainer = styled.div`
    display: flex;

    @media (max-width: 992px) {
        flex-direction: column;
    }
`;

const WhatItem = styled.div`
    text-align: left;
    margin: 8px 16px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid;
    margin-right: 16px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const Description = styled.div`
    line-height: 28pt;
`;

const Button = styled.button`
    border-color: ${props => props.theme.colors.background.yellow};
    background-color: ${props => props.theme.colors.background.yellow};
    text-transform: uppercase;
    padding: 8px 16px;
    font-size: 12px;
`;

const whatItems = [
    {
        icon: "icona",
        title: "Design / Image",
        description:
            "Our aim is to create benefit for all stakeholders through software solutions designed for positive impact. Together with our customers and suppliers, we support humans and nature with projects that benefit the community and land."
    },
    {
        icon: "icona",
        title: "Develop & ship",
        description:
            "Shaping new ideas, using open tecnologies, and contributing opensource in our spare time. Reduce your costs while increasing the reliability and quality of your cloud computing experience."
    },
    {
        icon: "icona",
        title: "Training",
        description:
            "Training is offered throughout Italy, Europe and the world thanks to mondora.com. Whether you are looking for introductory or advanced training on our courses are just what you need."
    }
];

const Homepage = () => (
    <Layout>
        <FirstBox>
            <div>
                <h1>{"We using Software as a Force for Good"}</h1>
                <p>
                    {
                        "mondora is a Società Benefit and certified B Corporation. The mission of the company is to create benefit for all stakeholders through software solutions designed for positive impact. Together with our customers and suppliers we support humans and nature with projects that benefit the community and land."
                    }
                </p>
            </div>
            <Divider>
                <Line></Line>
                <Circle></Circle>
            </Divider>
            <div>
                <div>{"img"}</div>
            </div>
        </FirstBox>
        <BCorpLogo>{"b corp logo"}</BCorpLogo>
        <WhatContainer>
            <h1>{"What we can do for you"}</h1>
            <p>
                {
                    "Our aim is to create benefit for all stakeholders through software solutions designed for positive impact. Together with our customers and suppliers, we support humans and nature with projects that benefit the community and land."
                }
            </p>
            <WhatItemsContainer>
                {whatItems.map((item, key) => {
                    return (
                        <WhatItem key={key}>
                            <TitleContainer>
                                <Icon>{item.icon}</Icon>
                                <Title>{item.title}</Title>
                            </TitleContainer>
                            <Description>{item.description}</Description>
                        </WhatItem>
                    );
                })}
            </WhatItemsContainer>
            <Button>{"Service"}</Button>
        </WhatContainer>
    </Layout>
);

export default Homepage;
