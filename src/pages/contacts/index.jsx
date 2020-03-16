import React from "react";

import Divider from "../../components/divider";
import PageMetadata from "../../components/page-metadata";

import KeepInTouch from "../../components/pages/contacts/keep-in-touch";
import WhereToFindUs from "../../components/pages/contacts/where-to-find-us";
import Map from "../../components/pages/contacts/map";

import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import Section from "../../components/section";
import BackgroundStripe from "../../components/background-stripe";

const Contacts = () => (
    <Layout>
        <PageMetadata
            title="Contacts - mondora - Software and advisory company specilized in custom cloud solutions"
            description="Whether you are interested in working with us on a custom software solution for your business, or are just curious about the :m world, we would love to get in touch!"
        />
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
