import React from "react";

import styled from "styled-components";

import Layout from "../../components/layout";
import InstagramFeed from "../../components/instagram-feed";
import Section from "../../components/section";

const LeftParagraph = styled.div`
    text-align: left;
    margin: 40px 0 64px 40px;
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
        <Section position={"below"}>
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
            <RightParagraph>
                <RightTitle>
                    {"Be The"} <br />
                    {"Change"}
                </RightTitle>
            </RightParagraph>
        </Section>

        <InstagramFeed/>
    </Layout>
);

export default About;
