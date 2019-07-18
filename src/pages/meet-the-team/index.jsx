import React from "react";

import styled from "styled-components";

import Layout from "../../components/layout";

import Logo from "../../../static/images/regions/Japan-icon.png";
import RegionMiniature from "../../components/region";

const Container = styled.div`
    padding: 0 64px;
    margin-left: auto;
    display: grid;
    text-align: center;
    grid-template-columns: 1fr 32px 1fr;
    grid-column-gap: 16px;
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;
const Divider = styled.div`
    height: 100%;
    width: 100%;
`;
const Line = styled.div`
    border: 1px solid black;
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
    background-image: ${Circle};
    @media (max-width: 992px) {
        display: none;
    }
`;
const LeftParagraph = styled.div`
    text-align: left;
    margin-top: 80px;
    margin-bottom: 40px;
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
        name: "GIAPPONE / TOKYO",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / CUNEO",
        number: "5"
    },
    {
        image: Logo,
        name: "ITALIA / SONDRIO",
        number: "38"
    },
    {
        image: Logo,
        name: "LITUANIA / VILNIUS",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / LAMEZIA TERME",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / PRATO",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / MILANO",
        number: "6"
    },
    {
        image: Logo,
        name: "ITALIA / NAPOLI",
        number: "1"
    }
];

const MeetTheTeam = () => (
    <Layout>
        <Container>
            <LeftParagraph>
                <LeftTitle>{"Meet the team"}</LeftTitle>
                <LeftContent>
                    {
                        "Etiam gravida nibh erat, nec congue neque ultrices imperdiet. Etiam molestie augue sed risus aliquet, ut rhoncus purus fermentum. Aliquam ac tortor ligula. Nulla quis orci pulvinar."
                    }
                </LeftContent>
                <LeftContent>
                    {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate quam pharetra nunc molestie interdum. Sed nec lorem scelerisque, fermentum lacus a, congue lacus. "
                    }
                </LeftContent>
            </LeftParagraph>
            <Divider>
                <Line></Line>
                <Circle></Circle>
            </Divider>
            <RightParagraph>
                <RightTitle>
                    {"Mondora"} <br />
                    {"Team!"}
                </RightTitle>
            </RightParagraph>
        </Container>
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
