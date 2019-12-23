import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "styled-components";

import { Flex } from "reflexbox";

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

const HandbookDescription = styled.div`
    color: var(--text-dark-gray);
    margin: 16px;
`;

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

const FormModule = styled.div`
    height: fit-content;
    padding: 40px 240px;
    margin-top: 80px;
    text-align: center;
    background-color: var(--white);
`;

const reasons = [
    { empty: true },
    {
        number: "01",
        title: "Flat organization",
        description:
            "Aliquam venenatis at risus ac auctor. Maecenas at magna mattis ante consequat ultrices a eu tortor. "
    },
    {
        number: "02",
        title: "Forget old technologies",
        description:
            "Integer sit amet est ac tellus posuere maximus. Suspendisse at metus vel mi congue rhoncus a mole."
    },
    {
        number: "03",
        title: "Self-managed work",
        description:
            "Vivamus sit amet arcu quis arcu ullamcorper sagittis. In et sagittis elit. Morbi iaculis ante in erat tempus."
    },
    {
        number: "04",
        title: "Unlimited holidays",
        description:
            "Aenean eu mi eget neque faucibus congue et in lectus. Suspendisse potenti. Etiam nec dolor vitae purus pellentesque elementum id a velit. "
    },
    { empty: true },
    { empty: true },
    {
        number: "05",
        title: "Remote work",
        description:
            "Suspendisse potenti. Etiam nec dolor vitae purus pellentesque elementum id a velit."
    },
    {
        number: "06",
        title: "Laboratories and events",
        description:
            "Suspendisse potenti. Etiam nec dolor vitae purus pellentesque elementum id a velit. "
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
                            <Title>{"Meet the team"}</Title>
                            <Subtitle>
                                Etiam gravida nibh erat, nec congue neque
                                ultrices imperdiet. Etiam molestie augue sed
                                risus aliquet, ut rhoncus purus fermentum.
                                Aliquam ac tortor ligula. Nulla quis orci
                                pulvinar. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Maecenas vulputate
                                quam pharetra nunc molestie interdum. Sed nec
                                lorem scelerisque, fermentum lacus a, congue
                                lacus.
                            </Subtitle>
                        </Section.LeftContainer>

                        <Section.DividerContainer>
                            <Divider />
                        </Section.DividerContainer>

                        <Section.RightContainer>
                            <JumboTitle>
                                {"Our"}
                                <br />
                                {"Team!"}
                            </JumboTitle>
                        </Section.RightContainer>
                    </Section>
                </BackgroundStripe>
            </MaxWidthContainer>

            <BackgroundStripe>
                <MaxWidthContainer justifyContent="center">
                    <Title>{"Mondora Srl"}</Title>
                    <HandbookDescription>
                        We are a software development company working with
                        selected clients who subscribe to our unique approach on
                        agile, cloud development and cloud governance.
                    </HandbookDescription>
                    <SuperA>
                        <SquareButton>{"Our Handbook"}</SquareButton>
                    </SuperA>
                </MaxWidthContainer>
            </BackgroundStripe>

            <Carousel slidesToShow={3} slidesToScroll={3} fillWidth={true}>
                {allInstaNode.edges.map(instagram => (
                    <FullWidthImage
                        key={instagram.node.id}
                        fluid={instagram.node.localFile.childImageSharp.fluid}
                    />
                ))}
            </Carousel>

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
            <Section position={"below"} />

            <BackgroundStripe theme="light">
                <MaxWidthContainer>
                    <Title>{"Apply"}</Title>
                    <FormModule>
                        {/* TODO: insert contact module */}
                        <div>
                            Vivamus rutrum turpis sed turpis malesuada
                            facilisis. Aliquam laoreet rhoncus est, ac
                            vestibulum nunc mollis sed. Quisque dolor risus,
                            vehicula non tempus in, venenatis fermentum enim.
                        </div>

                        <SquareButton>{"Send"}</SquareButton>
                    </FormModule>
                </MaxWidthContainer>
            </BackgroundStripe>
        </Layout>
    );
};

export default WorkWithUs;
