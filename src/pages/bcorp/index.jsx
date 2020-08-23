import React from "react";

import rehypeReact from "rehype-react";
import { graphql, useStaticQuery } from "gatsby";

import styled from "styled-components";

import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import PageMetadata from "../../components/page-metadata";
import Title from "../../components/title";
import Subtitle from "../../components/subtitle";
import JumboTitle from "../../components/jumbo-title";
import BackgroundStripe from "../../components/background-stripe";
import FaqElement from "../../components/faq-element";
import Section from "../../components/section";
import Divider from "../../components/divider";
import BenefitCarousel from "../../components/benefit-carousel";
import ImpactReport from "../../components/impact-report";

const marginSubtitle = styled(Subtitle)`
    margin: 32px 0 0 0;
`;

const reports = [
    {
        year: "2017",
        title: "Impact Report 2017",
        button: "Read report >",
        to: "../impact-reports/impact-report-2017.pdf"
    },
    {
        year: "2018",
        title: "Impact Report 2018",
        button: "Read report >",
        to: "../impact-reports/impact-report-2017.pdf"
    },
    {
        year: "2019",
        title: "Impact Report 2019",
        button: "Read report >",
        to: "https://app.gitbook.com/@mondora/s/relazione-di-impatto-2019/"
    }
];

const BCorp = () => {
    const { contentfulImpactPage } = useStaticQuery(graphql`
        query {
            contentfulImpactPage {
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
            }
        }
    `);

    const renderAst = new rehypeReact({
        createElement: React.createElement,
        components: { h1: JumboTitle, h2: Title, p: marginSubtitle }
    }).Compiler;

    return (
        <Layout>
            <PageMetadata
                title={contentfulImpactPage.metaTitle.metaTitle}
                description={contentfulImpactPage.metaDescr.metaDescr}
            />
            <BackgroundStripe>
                <MaxWidthContainer>
                    <Section header={true}>
                        <Section.LeftContainer>
                            {renderAst(
                                contentfulImpactPage.leftHeader
                                    .childMarkdownRemark.htmlAst
                            )}
                        </Section.LeftContainer>

                        <Section.DividerContainer>
                            <Divider />
                        </Section.DividerContainer>
                        <Section.RightContainer>
                            {renderAst(
                                contentfulImpactPage.rightHeader
                                    .childMarkdownRemark.htmlAst
                            )}
                        </Section.RightContainer>
                    </Section>
                </MaxWidthContainer>
            </BackgroundStripe>

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
                    {reports.map(report => (
                        <ImpactReport key={report.year} report={report} />
                    ))}
                </MaxWidthContainer>
            </BackgroundStripe>
        </Layout>
    );
};

export default BCorp;
