import React from "react";

import { Link } from "gatsby";

import Layout from "../../components/layout";
import Section from "../../components/section";
import RegionMiniature from "../../components/region";
import Divider from "../../components/divider";
import SquareButton from "../../components/square-button";
import MaxWidthContainer from "../../components/max-width-container";
import BackgroundStripe from "../../components/background-stripe";
import Title from "../../components/title";
import Subtitle from "../../components/subtitle";
import JumboTitle from "../../components/jumbo-title";

import Logo from "../../../static/images/regions/Japan-icon.png";

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
    },
    {
        image: Logo,
        name: "ITALIA / BERGAMO",
        number: "1"
    }
];

const MeetTheTeam = () => (
    <Layout>
        <BackgroundStripe>
            <MaxWidthContainer>
                <Section header={true}>
                    <Section.LeftContainer>
                        <Title>{"We are :mondora"}</Title>
                        <Subtitle>
                            {
                                "Hello! Here you can learn a little about each one of us and how we join together to make the amazing :m team. We have divided our profiles by geographical area to help with navigation… nice to meet you!"
                            }
                        </Subtitle>

                        <Subtitle>
                            <Link to={"/work-with-us"}>
                                <SquareButton>{"Join the team !"}</SquareButton>
                            </Link>
                        </Subtitle>
                    </Section.LeftContainer>

                    <Section.DividerContainer>
                        <Divider />
                    </Section.DividerContainer>

                    <Section.RightContainer>
                        <JumboTitle>{"Meet the team"}</JumboTitle>
                    </Section.RightContainer>
                </Section>
            </MaxWidthContainer>
        </BackgroundStripe>

        <BackgroundStripe theme="light">
            <MaxWidthContainer>
                {Regions.map((region, i) => (
                    <RegionMiniature
                        key={i}
                        image={region.image}
                        number={region.number}
                        name={region.name}
                        link={"meet-the-team/region"}
                        button={"WHO'S HERE >"}
                    />
                ))}
            </MaxWidthContainer>
        </BackgroundStripe>
    </Layout>
);

export default MeetTheTeam;
