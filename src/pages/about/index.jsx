import React from "react";

import styled from "styled-components";

import Layout from "../../components/layout";
import InstagramFeed from "../../components/instagram-feed";
import Section from "../../components/section";
import Divider from "../../components/divider";

const LeftParagraph = styled.div`
    @media (max-width: 992px) {
        text-align: center;
    }
`;

const LeftTitle = styled.h1`
    margin-top: 16px;
`;

const LeftContent = styled.div`
    color: var(--text-gray);

    @media (max-width: 992px) {
        margin: 24px auto;
    }
`;

const RightParagraph = styled.div`
    text-align: center;
`;

const RightTitle = styled.h1`
    font-size: 80pt;
`;

const About = () => (
    <Layout>
        <Section gutter={32}>
            <Section.LeftContainer padding={64}>
                <LeftParagraph>
                    <LeftTitle>
                        {
                            "We Design and Build Software that generates Positive Impact"
                        }
                    </LeftTitle>
                    <LeftContent>
                        {
                            "mondora is a software and advisory company specialising in custom cloud solutions for all kinds of businesses. "
                        }
                    </LeftContent>
                </LeftParagraph>
            </Section.LeftContainer>

            <Section.DividerContainer>
                <Divider />
            </Section.DividerContainer>

            <Section.RightContainer>
                <RightParagraph>
                    <RightTitle>
                        {"BeThe"} <br />
                        {"Change"}
                    </RightTitle>
                </RightParagraph>
            </Section.RightContainer>
        </Section>

        <InstagramFeed />
    </Layout>
);

export default About;
