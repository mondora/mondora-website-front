import React from "react";

import styled from "styled-components";

import Layout from "../../components/layout";
import InstagramFeed from "../../components/instagram-feed";

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
    @media (max-width: 992px) {
        display: none;
    }
`;
const LeftParagraph = styled.div`
    text-align: left;
    margin-top: 40px;
    margin-bottom: 40px;
    @media (max-width: 992px) {
        text-align: center;
    }
`;
const LeftTitle = styled.h1`
    margin-top: 16px;
`;
const LeftContent = styled.div`
    width: 90%;
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

const About = () => (
    <Layout>
        <Container>
            <LeftParagraph>
                <LeftTitle>{"About Mondora"}</LeftTitle>
                <LeftContent>
                    {
                        "mondora is a mix up of Software Architects, Visionary People, DevOps Consultants and Agilists who together create “the perfect” team for every occasion."
                    }
                </LeftContent>
                <LeftTitle>{"Our Mission"}</LeftTitle>
                <LeftContent>
                    {
                        "mondora is a mix up of Software Architects, Visionary People, DevOps Consultants and Agilists who together create “the perfect” team for every occasion."
                    }
                </LeftContent>
            </LeftParagraph>
            <Divider>
                <Line></Line>
                <Circle></Circle>
            </Divider>
            <RightParagraph>
                <RightTitle>
                    {"Be The"} <br />
                    {"Change"}
                </RightTitle>
            </RightParagraph>
        </Container>
        <InstagramFeed></InstagramFeed>
    </Layout>
);

export default About;
