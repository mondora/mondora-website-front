import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "styled-components";

import { Flex, Box } from "reflexbox";

import SquareButton from "../../components/square-button";
import Section from "../../components/section";
import Divider from "../../components/divider";
import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import BackgroundStripe from "../../components/background-stripe";
import Subtitle from "../../components/subtitle";
import Title from "../../components/title";
import FullWidthImage from "../../components/full-width-image";
import Carousel from "../../components/carousel";
import JumboTitle from "../../components/jumbo-title";

const SuperA = styled.a`
    text-decoration: none;
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

const carouselSettings = {
    arrows: true,
    dots: true,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                dots: false
            }
        }
    ]
};

const reasons = [
    { empty: true },
    {
        number: "01",
        title: "Self managed work",
        description:
            "you will be working with a team and organising work together."
    },
    {
        number: "02",
        title: "Remote work",
        description:
            "The possibility to work remotely wherever you want (from home, from the sea, from an alpin refuge…), to make you happier and lower your stress level."
    },
    {
        number: "03",
        title: "Continuous learning",
        description:
            "Keep improving your skillset by collaborating with different peers coming from various backgrounds and by following specific training courses."
    },
    {
        number: "04",
        title: "Bring your impact",
        description:
            "Bring you passions inside mondora so that we can work together toward creating positive impact!"
    },
    { empty: true },
    { empty: true },
    {
        number: "05",
        title: "Try out new technologies",
        description:
            "Choose the best tools to acomplish your goals and share what you find interesting with your peers through an article on the blog or a 4to5."
    }
];

const WorkWithUs = () => {
    const { allInstaNode } = useStaticQuery(graphql`
        query ScrapingQuery {
            allInstaNode {
                edges {
                    node {
                        id
                        username
                        likes
                        caption
                        comments
                        localFile {
                            childImageSharp {
                                fluid(
                                    quality: 70
                                    maxWidth: 600
                                    maxHeight: 600
                                ) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <MaxWidthContainer>
                <BackgroundStripe>
                    <Section header={true}>
                        <Section.LeftContainer>
                            <Title>{"Join the :m team!"}</Title>
                            <Subtitle>
                                {
                                    "We are a diverse team of passionate people putting our unique skills to work towards a shared purpose: making the world a better place through innovation, technology and software solutions."
                                }
                                <br />
                                <br />
                                {
                                    "Do you want to change the world? This might just be the right place for you! Read on to learn more…"
                                }
                            </Subtitle>
                        </Section.LeftContainer>

                        <Section.DividerContainer>
                            <Divider />
                        </Section.DividerContainer>

                        <Section.RightContainer>
                            <JumboTitle>
                                {"Work"}
                                <br />
                                {"with us!"}
                            </JumboTitle>
                        </Section.RightContainer>
                    </Section>
                </BackgroundStripe>
            </MaxWidthContainer>

            <BackgroundStripe>
                <MaxWidthContainer justifyContent="center">
                    <Title>{"Mondora"}</Title>
                    <MaxWidthContainer>
                        <Subtitle center={[true, true]}>
                            {
                                "We are a diverse team of passionate people putting our unique skills to work towards a shared purpose: making the world a better place throug software solutions."
                            }
                        </Subtitle>
                    </MaxWidthContainer>
                    <SuperA href={"https://github.com/mondora/handbook"}>
                        <SquareButton>{"OUR HANDBOOK"}</SquareButton>
                    </SuperA>
                </MaxWidthContainer>
            </BackgroundStripe>

            <Box mb={5}>
                <Carousel {...carouselSettings}>
                    {allInstaNode.edges.map(instagram => (
                        <Box p={3} key={instagram.node.id}>
                            <FullWidthImage
                                fluid={
                                    instagram.node.localFile.childImageSharp
                                        .fluid
                                }
                            />
                        </Box>
                    ))}
                </Carousel>
            </Box>

            <BackgroundStripe>
                <MaxWidthContainer justifyContent="center">
                    <Title>{"Why work with us?"}</Title>
                    <Flex flexWrap="wrap" padding={-4}>
                        {reasons.map((reason, index) => (
                            <Flex
                                key={index}
                                width={[1, 1 / 2, 1 / 3]}
                                flexDirection="column"
                                padding={4}
                            >
                                {!reason.empty && (
                                    <>
                                        <ReasonNumber>
                                            {reason.number}
                                        </ReasonNumber>
                                        <Title>{reason.title}</Title>
                                        <Subtitle>
                                            {reason.description}
                                        </Subtitle>
                                    </>
                                )}
                            </Flex>
                        ))}
                    </Flex>
                </MaxWidthContainer>
            </BackgroundStripe>
        </Layout>
    );
};

export default WorkWithUs;
