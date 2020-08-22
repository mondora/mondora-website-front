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

const faqs = [
    {
        question:
            "Mondora is both a certified B Corp and a Benefit Corporation. What is the difference?",
        answer:
            "The B Corp certification is awarded by the non-profit organization B Lab to the companies that, through their economic activity, create a positive impact for people and the environment. Subsequently to the certification, mondora became a Benefit Corporation, a registered company that as well as creating profit, also creates a positive impact on the environment: in addition to the financial statement there is also the obligation to file an impact report."
    },
    {
        question:
            "Has the company introduced environmental innovations (for example for the management of waste, the reduction of pollutants, for the reduction of consumption)?",
        answer:
            "Mondora has introduced various environmental innovations, among these are: ",
        details: [
            {
                title: "Cycle2Work ",
                description:
                    "to reduce Co2 emissions from commuting. For each employee who takes part in this project, the company pays 0,20 euros for every km traveled by bicycle or on foot."
            },
            {
                title: "Waste reduction: ",
                description:
                    "we have a system that is able to measure the amount of waste produced in the office, so that we can set reduction targets and work together to reach them and limit our waste."
            },
            {
                title: "Plastic free: ",
                description:
                    "we support an initiative against the use of single-use plastic through the purchase of reusable water bottles for each employee, because we believe it is important to reduce waste."
            },
            {
                title: "Paper free: ",
                description:
                    "we continue to be a paper-free company and we also try to help our clients to limit their use of paper."
            }
        ]
    },
    {
        question:
            "By definition, Benefit Corporations have a twofold mission: profit and mutual benefit. How do you manage to promote both simultaneously? Is there the risk of conflict of interests?",
        answer:
            "In order to create benefit, a company needs to make a profit. Where this is not possible, profit derives directly from projects that create benefit - in fact, we stipulate an interdependence agreement with many of our clients in which both parties commit to the creation of a positive impact. Where this is not possible, the profit obtained through other work is used, in part, towards the creation of benefit through our own projects. As long as a company commits to creating social benefit, there is no risk of conflict between the two aspects. It is important to remember that a Benefit Corporation is still a company for profit and not a non-profit organization."
    },
    {
        question:
            "What changes in company governance did you have to make in order to become a Benefit Corporation? How did the shareholders, collaborators and other stakeholders react?",
        answer:
            "As we were already a Certified B Corp, there have not been great changes inside mondora, becoming an official Benefit Corporation was simply a legal act. Even becoming a B Corp was an easy process for us, it simply gave us a badge for how we already were, without needing to make changes within the company. This change was met with great enthusiasm by all our stakeholders and the reactions have been entirely positive."
    },
    {
        question:
            "Do you think that a certifying body (like B Lab for B Corps) would add value to a benefit corporation?",
        answer:
            "Absolutely, we believe that it is essential because the certification proves that the company is really doing what it claims to do. B Lab carries out checks in the companies every year and guarantees the quality of the benefit part of the company. Changing the statute is easy, applying these principles in practice is a completely different matter."
    },
    {
        question:
            "Can we consider the B Corp certification as an innovative tool for company governance, to ensure greater transparency towards shareholders? If so, in what way?",
        answer:
            "The certification in itself makes the company’s work transparent and the results are accessible to everyone. Furthermore, the certification is also used as an incentive for transparency, which nowadays is a quality that the clients often seek. In our case, we already practiced complete transparency towards  shareholders, but we believe that this can be useful in innovating other companies that are more “standard”. "
    },
    {
        question:
            "As a Benefit Corporation you have the obligation of writing a Benefit Report annually along with the financial report. What are the contents of your Benefit Report? What are the benefits of a Benefit Report and what is the use towards shareholders/stakeholders?",
        answer:
            "Our Benefit Report discusses all of our projects and work that have brought social benefit in the past year. It is related to our company statute and to the benefits we have committed to delivering. These benefits are the clarity and transparency of our company’s work which prove the way in which it operates. The stakeholders can view this information freely."
    },
    {
        question:
            "Are there any extra specific responsibilities compared to other traditional companies, for Benefit Corporations (in regards to the investors)? In what way do the rights/obligations change to and from the shareholders in a Benefit Corporation?",
        answer:
            "There are definitely some extra responsibilities, because a Benefit Corporation must take care of every stakeholder and not just the shareholders. There is a shift between a model in which making money is the only goal, to a model in which making money is a means by which to reach a greater goal, that is to create social benefit. The shareholders have the responsibility of contributing to the creation of benefit. "
    }
];

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
                {faqs.map((faq, i) => (
                    <FaqElement
                        key={i}
                        question={faq.question}
                        answer={faq.answer}
                        details={faq.details}
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
