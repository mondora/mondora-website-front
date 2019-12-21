import React from "react";

import styled from "styled-components";

import Image1 from "../../../static/images/image.png";

import SquareButton from "../../components/square-button";
import Section from "../../components/section";
import Divider from "../../components/divider";
import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import BackgroundStripe from "../../components/background-stripe";
import Subtitle from "../../components/subtitle";
import Title from "../../components/title";

const RightParagraph = styled.div`
    text-align: center;
    margin: 16px;
`;
const RightTitle = styled.h1`
    margin-top: 40px;
    font-size: 80px;
`;
const HandbookContainer = styled.div`
    text-align: center;
    width: 40%;
    margin: 40px auto;
`;

const HandbookDescription = styled.div`
    color: var(--text-dark-gray);
    margin: 16px;
`;
const SuperA = styled.a`
    text-decoration: none;
`;
const CarouselContainer = styled.div`
    text-align: center;
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 40px auto 80px auto;
`;
const CarouselImage = styled.img`
    width: 80%;
    margin: 16px 10%;
`;
const ReasonsContainer = styled.div`
    text-align: left;
    width: 80%;
    margin: 16px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;
const ReasonPanel = styled.div`
    padding: 40px;
    grid-column-start: ${props => props.col};
    grid-row-start: ${props => props.row};
`;
const ReasonNumber = styled.h1`
    position: relative;
    left: -48px;
    color: var(--variant-black);
    font-size: 50pt;
    margin: 0;
    &:before {
        color: var(--variant-black);
        content: "°  ";
    }
`;
const ReasonTitle = styled.h1`
    color: var(--variant-black);
    margin: 0;
`;

const FormModule = styled.div`
    height: fit-content;
    padding: 40px 240px;
    margin-top: 80px;
    text-align: center;
    background-color: var(--white);
`;

const images = [
    {
        source: Image1
    },
    {
        source: Image1
    },
    {
        source: Image1
    }
];
const Reasons = [
    {
        col: "2",
        row: "1",
        number: "01",
        title: "Flat organization",
        descriprion:
            "Aliquam venenatis at risus ac auctor. Maecenas at magna mattis ante consequat ultrices a eu tortor. "
    },
    {
        col: "3",
        row: "1",
        number: "02",
        title: "Forget old technologies",
        descriprion:
            "Integer sit amet est ac tellus posuere maximus. Suspendisse at metus vel mi congue rhoncus a mole."
    },
    {
        col: "1",
        row: "2",
        number: "03",
        title: "Self-managed work",
        descriprion:
            "Vivamus sit amet arcu quis arcu ullamcorper sagittis. In et sagittis elit. Morbi iaculis ante in erat tempus."
    },
    {
        col: "2",
        row: "2",
        number: "04",
        title: "Unlimited holidays",
        descriprion:
            "Aenean eu mi eget neque faucibus congue et in lectus. Suspendisse potenti. Etiam nec dolor vitae purus pellentesque elementum id a velit. "
    },
    {
        col: "2",
        row: "3",
        number: "05",
        title: "Remote work",
        descriprion:
            "Suspendisse potenti. Etiam nec dolor vitae purus pellentesque elementum id a velit."
    },
    {
        col: "3",
        row: "3",
        number: "06",
        title: "Laboratories and events",
        descriprion:
            "Suspendisse potenti. Etiam nec dolor vitae purus pellentesque elementum id a velit. "
    }
];

const WorkWithUs = () => (
    <Layout>
        <MaxWidthContainer>
            <BackgroundStripe>
                <Section header={true}>
                    <Section.LeftContainer>
                        <Title>{"Meet the team"}</Title>
                        <Subtitle>
                            Etiam gravida nibh erat, nec congue neque ultrices
                            imperdiet. Etiam molestie augue sed risus aliquet,
                            ut rhoncus purus fermentum. Aliquam ac tortor
                            ligula. Nulla quis orci pulvinar. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Maecenas
                            vulputate quam pharetra nunc molestie interdum. Sed
                            nec lorem scelerisque, fermentum lacus a, congue
                            lacus.
                        </Subtitle>
                    </Section.LeftContainer>

                    <Section.DividerContainer>
                        <Divider />
                    </Section.DividerContainer>

                    <Section.RightContainer>
                        <RightParagraph>
                            <RightTitle>
                                {"Mondora"} <br />
                                {"Team!"}
                            </RightTitle>
                        </RightParagraph>
                    </Section.RightContainer>
                </Section>
            </BackgroundStripe>
        </MaxWidthContainer>

        <HandbookContainer>
            <Title>{"Mondora Srl"}</Title>
            <HandbookDescription>
                We are a software development company working with selected
                clients who subscribe to our unique approach on agile, cloud
                development and cloud governance.
            </HandbookDescription>
            <SuperA>
                <SquareButton>{"HANDBOOK LINK"}</SquareButton>
            </SuperA>
        </HandbookContainer>

        <CarouselContainer>
            {images.map((image, i) => (
                <CarouselImage key={i} src={image.source} />
            ))}
        </CarouselContainer>

        <Title>{"Why work with us?"}</Title>
        <ReasonsContainer>
            {Reasons.map((reason, i) => (
                <ReasonPanel key={i} col={reason.col} row={reason.row}>
                    <ReasonNumber>{reason.number}</ReasonNumber>
                    <ReasonTitle>{reason.title}</ReasonTitle>
                    <Subtitle>{reason.descriprion}</Subtitle>
                </ReasonPanel>
            ))}
        </ReasonsContainer>
        <Section position={"below"} />

        <BackgroundStripe>
            <MaxWidthContainer>
                <Title>{"Apply"}</Title>
                <FormModule>
                    {/* TODO: insert contact module */}
                    <div>
                        Vivamus rutrum turpis sed turpis malesuada facilisis.
                        Aliquam laoreet rhoncus est, ac vestibulum nunc mollis
                        sed. Quisque dolor risus, vehicula non tempus in,
                        venenatis fermentum enim.
                    </div>
                    <SuperA>
                        <SquareButton>{"Send"}</SquareButton>
                    </SuperA>
                </FormModule>
            </MaxWidthContainer>
        </BackgroundStripe>
    </Layout>
);

export default WorkWithUs;
