import React from "react";

import Divider from "../../../divider";
import Title from "../../../title";
import Subtitle from "../../../subtitle";
import Section from "../../../section";
import JumboTitle from "../../../jumbo-title";
import MaxWidthContainer from "../../../max-width-container";
import BackgroundStripe from "../../../background-stripe";

const Header = () => (
    <BackgroundStripe>
        <MaxWidthContainer>
            <Section header={true}>
                <Section.LeftContainer>
                    <Title>
                        We Design and Build Software that generates Positive
                        Impact
                    </Title>

                    <Subtitle>
                        Mondora is a software and advisory company specialising
                        in custom cloud solutions for all kinds of businesses.
                    </Subtitle>
                </Section.LeftContainer>

                <Section.DividerContainer>
                    <Divider />
                </Section.DividerContainer>

                <Section.RightContainer>
                    <JumboTitle>
                        {"BeThe"}
                        <br />
                        {"Change"}
                    </JumboTitle>
                </Section.RightContainer>
            </Section>
        </MaxWidthContainer>
    </BackgroundStripe>
);

export default Header;
