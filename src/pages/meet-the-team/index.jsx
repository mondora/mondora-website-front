import React from "react";

import styled from "styled-components";

import Layout from "../../components/layout";
import Section from "../../components/section"

import Logo from "../../../static/images/regions/Japan-icon.png";
import RegionMiniature from "../../components/region";

const LeftParagraph = styled.div`
    text-align: left;
    margin: 40px 0 40px 64px;
    @media (max-width: 992px) {
        text-align: center;
    }
`;
const LeftTitle = styled.h1`
    margin-top: 16px;
    font-size: ${props => props.theme.size.text.mondora};
`;
const LeftContent = styled.div`
    width: 70%;
    margin: 24px auto 24px 0;
    line-height: 1.6;
    @media (max-width: 992px) {
        margin: 24px auto;
    }
`;
const RightParagraph = styled.div`
    text-align: center;
    margin: 16px;
`;
const RightTitle = styled.h1`
    margin-top: 40px;
    font-size: 80px;
`;
const ContainerRegions = styled.div`
    height: fit-content;
    padding: 40px 240px;
    margin-top: 80px;
    text-align: center;
    background-color: var(--variant-lightgray);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Regions = [
    {
        image: Logo,
        name: "ITALIA / SONDRIO",
        number: "37"
    },
    {
        image: Logo,
        name: "ITALIA / MILANO",
        number: "8"
    },
    {
        image: Logo,
        name: "ITALIA / CUNEO",
        number: "5"
    },
    {
        image: Logo,
        name: "ITALIA / PESARO",
        number: "2"
    },
    {
        image: Logo,
        name: "SVIZZERA / POSCHIAVO",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / AREZZO",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / CASERTA",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / VICENZA",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / NOVARA",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / PAVIA",
        number: "1"
    },    {
        image: Logo,
        name: "ITALIA / BERGAMO",
        number: "1"
    },
];

const MeetTheTeam = () => (
    <Layout>
        <Section position={"below"} top={"32px"}>
            <LeftParagraph>
                <LeftTitle>{"We are :mondora"}</LeftTitle>
                <LeftContent>
                    {
                        "Hello! Here you can learn a little about each one of us and how we join together to make the amazing :m team. We have divided our profiles by geographical area to help with navigation… nice to meet you!"
                    }
                </LeftContent>
            </LeftParagraph>
            <RightParagraph>
                <RightTitle>{"Meet the team"}</RightTitle>
            </RightParagraph>
        </Section>
        <ContainerRegions>
            {Regions.map(region => (
                <RegionMiniature
                    image={region.image}
                    number={region.number}
                    name={region.name}
                    link={"meet-the-team/region"}
                    button={"WHO'S HERE >"}
                ></RegionMiniature>
            ))}
        </ContainerRegions>
    </Layout>
);

export default MeetTheTeam;
