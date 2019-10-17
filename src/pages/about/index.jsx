import React from "react";

import InstagramFeed from "../../components/instagram-feed";
import Section from "../../components/section";
import Divider from "../../components/divider";
import FeaturesContainer from "../../components/features-container";

import Underline from "../../../static/images/separator.svg";
import Image1 from "../../../static/images/diversity.png";
import Image2 from "../../../static/images/brothers.png";
import Image3 from "../../../static/images/working.png";
import Layout from "../../components/layout";

import {
    LeftParagraph,
    LeftTitle,
    LeftContent,
    RightTitle,
    AboutSection,
    AboutWrapper,
    TitleAndDescription,
    AboutTitle,
    AboutParagraph,
    AboutDivider,
    AboutImage,
    AboutConclusion
} from "./styled";

const FeaturesFirst = [
    {
        title: "Our Methodologies",
        description:
            "We have been working with Agile Methodologies and Scrum since 2002 and many of us have Scrum Master and Product Owner certifications as well as being expert Scrum Developers - which means we are able to navigate complex projects and reach amazing results by collaborating with you!"
    },
    {
        title: "Innovative technologies",
        description:
            "As a team, we have been developing Cloud applications since 2007 and have gained valuable experience in these past years of work. We are strongly focused on innovation and emerging technologies and are always eager to test new things… and celebrate with a party when we fail ;)"
    },
    {
        title: "Structure",
        description:
            "Keeping in mind that we are a self-managed, flat structured B Corporation (that’s a lot of stuff) we cannot develop solutions that don’t make an impact, so Benefit by Design is a must-have in all our applications.. as well as opting for Open Source as often as we can."
    }
];

const FeaturesSecond = [
    {
        title: "The name",
        description:
            "Someone advised them to simply use their surname as the company name, and that is how mondora was born. The brothers grew up in a rural village in Valtellina, in the Italian Alps and close to Switzerland."
    },
    {
        title: "Farming and passion",
        description:
            "They learned a lot about farming and to this day they continue to share their passion and devotion to this noble art, so much that they have included a statement about helping local farmers in mondora’s official mission statement."
    },
    {
        title: "Rules",
        description:
            "Michele and Francesco also share an aversion for company hierarchies and rules, believing from the start that people who join the company should be treated as adults and trusted to take on tasks and responsibilities without supervision."
    }
];

const FeaturesThird = [
    {
        title: "Failure party",
        description:
            "We are a team of explorers who are allowed to have Failure Parties when we try to learn something new and mess up."
    },
    {
        title: "Passions",
        description:
            "This mix of qualities and passions allows us to push boundaries and keep learning and innovating. So if you have a challenging project for us… bring it on!"
    },
    {
        title: "Experimenting",
        description:
            "Right now we are experimenting with, and would like to work more on: Machine Learning, Artificial Intelligence, Augmented Reality, Blockchain Technology...and more"
    }
];
const About = () => (
    <Layout>
        <Section gutter={32} margin={"auto"}>
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

        <AboutSection color="light" marginTop>
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
        </AboutSection>
    </Layout>
);

export default About;
