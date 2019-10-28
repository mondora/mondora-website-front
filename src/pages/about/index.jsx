import React from "react";

import Layout from "../../components/layout";

import Grid from "../../components/grid";
import Header from "../../components/pages/about-us/header";
import WhoWeAre from "../../components/pages/about-us/who-we-are";
import WhereDoWeComeFrom from "../../components/pages/about-us/where-do-we-come-from";
import WhereAreWeDreamingOfGoingTogether from "../../components/pages/about-us/where-are-we-dreaming-of-going-together";

const About = () => (
    <Layout>
        <Grid
            container
            xs={12}
            align="center"
            spacingRatio={8}
            direction="column"
        >
            <Grid item xs={11}>
                <Header />
            </Grid>
            <Grid item xs={12} justify="center">
                <WhoWeAre />
                <WhereDoWeComeFrom />
                <WhereAreWeDreamingOfGoingTogether />
            </Grid>
        </Grid>
        {/* <Section gutter={32} margin={"auto"}>
            <Section.LeftContainer>
                <LeftParagraph hideOnMobile>
                    <LeftTitle>
                        {
                            "We Design and Build Software that generates Positive Impact"
                        }
                    </LeftTitle>
                    <LeftContent>
                        {
                            "Mondora is a software and advisory company specialising in custom cloud solutions for all kinds of businesses. "
                        }
                    </LeftContent>
                </LeftParagraph>
                <RightTitle>
                    {"BeThe"} <br />
                    {"Change"}
                </RightTitle>
            </Section.LeftContainer>

            <Section.DividerContainer middleDivider>
                <Divider />
            </Section.DividerContainer>

            <Section.RightContainer middleDivider>
                <RightTitle hideOnMobile>
                    {"BeThe"} <br />
                    {"Change"}
                </RightTitle>
                <LeftParagraph>
                    <LeftTitle>
                        {
                            "We Design and Build Software that generates Positive Impact"
                        }
                    </LeftTitle>
                    <LeftContent>
                        {
                            "Mondora is a software and advisory company specialising in custom cloud solutions for all kinds of businesses. "
                        }
                    </LeftContent>
                </LeftParagraph>
            </Section.RightContainer>
        </Section>

        <AboutSection light marginTop>
            <AboutWrapper>
                <TitleAndDescription>
                    <AboutTitle color={"light"}>{"WHO WE ARE"}</AboutTitle>
                    <h1>{"Mondora, a really diverse group"}</h1>
                    <AboutParagraph>
                        {
                            "We are a passionate and dedicated team of over 60 Full-Stack Software Developers, UX Designers, System Administrators… and a few Farmers!"
                        }
                    </AboutParagraph>
                    <AboutDivider src={Underline} />
                </TitleAndDescription>
                <AboutImage src={Image1} />
            </AboutWrapper>
            <FeaturesContainer features={FeaturesFirst} />
        </AboutSection>

        <AboutSection color={"dark"}>
            <AboutWrapper>
                <AboutImage src={Image2} />
                <TitleAndDescription>
                    <AboutTitle color={"dark"}>
                        {"WHERE DO WE COME FROM"}
                    </AboutTitle>
                    <h1>{"From 2002 to now"}</h1>
                    <AboutParagraph>
                        {
                            "In 2002 two brothers, Michele and Francesco Mondora, decided to found a small company together with their respective wives, Sara and Lucia.  "
                        }
                    </AboutParagraph>
                    <AboutDivider src={Underline} />
                </TitleAndDescription>
            </AboutWrapper>
            <FeaturesContainer features={FeaturesSecond} dark />
            <AboutConclusion>
                {
                    "That’s why, as the company grew over the years, no one ever had office hours or a fixed office to be in every day. What we do have is a lot of responsibility...and freedom to make business decisions and talk to our customers. "
                }
            </AboutConclusion>
        </AboutSection>

        <AboutSection color={"light"}>
            <AboutWrapper>
                <TitleAndDescription>
                    <AboutTitle color={"light"}>
                        {"WHERE ARE WE DREAMING OF GOING TOGETHER"}
                    </AboutTitle>
                    <h1>
                        {
                            "We love innovation, new technologies and new challenges"
                        }
                    </h1>
                    <AboutParagraph>
                        {
                            "We are  a team of open-minded and kind people who always offer each other help to overcome obstacles and create cutting edge solutions to problems."
                        }
                    </AboutParagraph>
                    <AboutDivider src={Underline} />
                </TitleAndDescription>
                <AboutImage src={Image3} />
            </AboutWrapper>
            <FeaturesContainer features={FeaturesThird} />
            <InstagramFeed />
        </AboutSection> */}
    </Layout>
);

export default About;
