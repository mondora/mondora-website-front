import React from "react";

import Divider from "../../components/divider";

import KeepInTouch from "../../components/pages/contacts/keep-in-touch";
import WhereToFindUs from "../../components/pages/contacts/where-to-find-us";
import Map from "../../components/pages/contacts/map";

import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import Section from "../../components/section";
import BackgroundStripe from "../../components/background-stripe";

const Contacts = () => (
    <Layout>
        <MaxWidthContainer>
            <BackgroundStripe>
                <Section header={true}>
                    <Section.LeftContainer sideOnTop={"left"}>
                        <KeepInTouch />
                    </Section.LeftContainer>
                    <Section.DividerContainer sideOnTop={"left"}>
                        <Divider />
                    </Section.DividerContainer>
                    <Section.RightContainer sideOnTop={"left"}>
                        <WhereToFindUs />
                    </Section.RightContainer>
                </Section>
            </BackgroundStripe>
        </MaxWidthContainer>

        <Map />
    </Layout>
);

export default Contacts;
