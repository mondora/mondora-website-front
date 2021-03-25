import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import Divider from "../../components/divider";
import PageMetadata from "../../components/page-metadata";

import KeepInTouch from "../../components/pages/contacts/keep-in-touch";
import WhereToFindUs from "../../components/pages/contacts/where-to-find-us";

import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import Section from "../../components/section";
import BackgroundStripe from "../../components/background-stripe";

const Contacts = () => {
    const { contentfulContactsPage } = useStaticQuery(graphql`
        query {
            contentfulContactsPage {
                description
                header
                metaTitle {
                    metaTitle
                }
                metaDescr {
                    metaDescr
                }
                contacts {
                    email
                    facebook
                    github
                    instagram
                    partitaIva
                    linkedIn
                    twitter
                    youtube
                }
            }
        }
    `);
    return (
        <Layout>
            <PageMetadata
                title={contentfulContactsPage.metaTitle.metaTitle}
                description={contentfulContactsPage.metaDescr.metaDescr}
            />
            <MaxWidthContainer>
                <BackgroundStripe>
                    <Section header={true}>
                        <Section.LeftContainer sideOnTop={"left"}>
                            <KeepInTouch
                                contactInfo={contentfulContactsPage.contacts}
                                header={contentfulContactsPage.header}
                                description={contentfulContactsPage.description}
                            />
                        </Section.LeftContainer>
                        <Section.DividerContainer sideOnTop={"left"}>
                            <Divider />
                        </Section.DividerContainer>
                        <Section.RightContainer sideOnTop={"left"}>
                            <WhereToFindUs
                                contacts={contentfulContactsPage.contacts}
                            />
                        </Section.RightContainer>
                    </Section>
                </BackgroundStripe>
            </MaxWidthContainer>
        </Layout>
    );
};

export default Contacts;
