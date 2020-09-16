import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import PageMetadata from "../../components/page-metadata";
import Layout from "../../components/layout";
import Header from "../../components/header";
import RegionMiniature from "../../components/region";
import MaxWidthContainer from "../../components/max-width-container";
import BackgroundStripe from "../../components/background-stripe";

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
                regions {
                    name
                    people {
                        id
                    }
                    button {
                        link
                        text
                    }
                    graphic {
                        title
                        fluid(quality: 50) {
                            ...GatsbyContentfulFluid
                        }
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
                    {contentfulTeamPage.regions.map((region, i) => (
                        <RegionMiniature
                            key={i}
                            image={region.graphic}
                            people={region.people}
                            name={region.name}
                            button={region.button}
                        />
                    ))}
                </MaxWidthContainer>
            </BackgroundStripe>
        </Layout>
    );
};

export default MeetTheTeam;
