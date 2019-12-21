import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import BackgroundStripe from "../../../background-stripe";
import Divider from "../../../divider";
import Subtitle from "../../../subtitle";
import Section from "../../../section";
import MaxWidthContainer from "../../../max-width-container";
import FullWidthImage from "../../../full-width-image";
import Title from "../../../title";

const Header = () => {
    const { headerImage } = useStaticQuery(graphql`
        query {
            headerImage: file(relativePath: { eq: "home/header.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <BackgroundStripe>
            <MaxWidthContainer>
                <Section header={true}>
                    <Section.LeftContainer>
                        <Title>What we can do for you</Title>

                        <Subtitle>
                            Our aim is to create benefit for all stakeholders by
                            designing and building software solutions that
                            maximise positive impact. Together with our
                            customers and suppliers, we support humans and
                            nature with projects that benefit the community and
                            land.
                        </Subtitle>
                    </Section.LeftContainer>
                    <Section.DividerContainer>
                        <Divider />
                    </Section.DividerContainer>
                    <Section.RightContainer>
                        <FullWidthImage
                            fluid={headerImage.childImageSharp.fluid}
                        />
                    </Section.RightContainer>
                </Section>
            </MaxWidthContainer>
        </BackgroundStripe>
    );
};

export default Header;
