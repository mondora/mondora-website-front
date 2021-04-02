import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Header from "../../components/header";
import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import PageMetadata from "../../components/page-metadata";
import Title from "../../components/title";
import BackgroundStripe from "../../components/background-stripe";
import FaqElement from "../../components/faq-element";
import BenefitCarousel from "../../components/benefit-carousel";
import ImpactReport from "../../components/impact-report";

const BCorp = () => {
    const { contentfulImpactPage } = useStaticQuery(graphql`
        query {
            contentfulImpactPage {
                node_locale
                metaDescr {
                    metaDescr
                }
                metaTitle {
                    metaTitle
                }
                leftHeader {
                    childMarkdownRemark {
                        headings {
                            id
                            value
                        }
                        htmlAst
                    }
                }
                rightHeader {
                    childMarkdownRemark {
                        headings {
                            id
                            value
                        }
                        htmlAst
                    }
                }
                projectsTitle
                benefitProjects {
                    link
                    buttonText
                    motto
                    projectName
                    description {
                        description
                    }
                    projectGraphics {
                        title
                        fluid(quality: 100) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
                faqsTitle
                faqs {
                    question {
                        question
                    }
                    answer {
                        childMarkdownRemark {
                            htmlAst
                        }
                    }
                }
                reportsTitle
                impactReports {
                    buttonLink
                    buttonText
                    title
                    year
                }
            }
        }
    `);

    return (
        <Layout>
            <PageMetadata
                title={contentfulImpactPage.metaTitle.metaTitle}
                description={contentfulImpactPage.metaDescr.metaDescr}
                locale={contentfulImpactPage.node_locale}
            />
            <Header
                left={
                    contentfulImpactPage.leftHeader.childMarkdownRemark.htmlAst
                }
                right={
                    contentfulImpactPage.rightHeader.childMarkdownRemark.htmlAst
                }
            />

            <Title center={true}>{contentfulImpactPage.projectsTitle}</Title>
            <BenefitCarousel projects={contentfulImpactPage.benefitProjects} />

            <MaxWidthContainer pb={5} justifyContent="center">
                <MaxWidthContainer p={4}>
                    <Title center={true}>
                        {contentfulImpactPage.faqsTitle}
                    </Title>
                </MaxWidthContainer>
                {contentfulImpactPage.faqs.map((faq, i) => (
                    <FaqElement
                        key={i}
                        question={faq.question.question}
                        answer={faq.answer.childMarkdownRemark.htmlAst}
                    />
                ))}
            </MaxWidthContainer>

            <BackgroundStripe theme="light">
                <Title center={true}>{contentfulImpactPage.reportsTitle}</Title>
                <MaxWidthContainer justifyContent="space-around">
                    {contentfulImpactPage.impactReports.map(report => (
                        <ImpactReport key={report.year} report={report} />
                    ))}
                </MaxWidthContainer>
            </BackgroundStripe>
        </Layout>
    );
};

export default BCorp;
