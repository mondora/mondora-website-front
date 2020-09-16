import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import PageMetadata from "../../components/page-metadata";
import Layout from "../../components/layout";
import Header from "../../components/header";
import RegionMiniature from "../../components/region";
import MaxWidthContainer from "../../components/max-width-container";
import BackgroundStripe from "../../components/background-stripe";

import Logo from "../../images/logo-square.png";

const Regions = [
    {
        image: Logo,
        name: "ITALIA / SONDRIO",
        number: "37"
    },
    {
        image: Logo,
        name: "ITALIA / MILANO",
        number: "8"
    },
    {
        image: Logo,
        name: "ITALIA / CUNEO",
        number: "5"
    },
    {
        image: Logo,
        name: "ITALIA / PESARO",
        number: "2"
    },
    {
        image: Logo,
        name: "SVIZZERA / POSCHIAVO",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / AREZZO",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / CASERTA",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / VICENZA",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / NOVARA",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / PAVIA",
        number: "1"
    },
    {
        image: Logo,
        name: "ITALIA / BERGAMO",
        number: "1"
    }
];

const MeetTheTeam = () => {
    const { contentfulTeamPage } = useStaticQuery(graphql`
        query {
            contentfulTeamPage {
                metaDescr {
                    metaDescr
                }
                metaTitle {
                    metaTitle
                }
                pageName
                leftHeader {
                    childMarkdownRemark {
                        htmlAst
                    }
                }
                leftButton {
                    text
                    link
                }
                rightHeader {
                    childMarkdownRemark {
                        htmlAst
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <PageMetadata
                title={contentfulTeamPage.metaTitle.metaTitle}
                description={contentfulTeamPage.metaDescr.metaDescr}
            />
            <Header
                left={contentfulTeamPage.leftHeader.childMarkdownRemark.htmlAst}
                right={
                    contentfulTeamPage.rightHeader.childMarkdownRemark.htmlAst
                }
                leftButton={contentfulTeamPage.leftButton}
            />

            <BackgroundStripe theme="light">
                <MaxWidthContainer>
                    {Regions.map((region, i) => (
                        <RegionMiniature
                            key={i}
                            image={region.image}
                            number={region.number}
                            name={region.name}
                            link={"meet-the-team/region"}
                            button={"WHO'S HERE >"}
                        />
                    ))}
                </MaxWidthContainer>
            </BackgroundStripe>
        </Layout>
    );
};

export default MeetTheTeam;
