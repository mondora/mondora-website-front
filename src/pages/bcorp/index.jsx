import React from "react";

import Layout from "../../components/layout";
import MaxWidthContainer from "../../components/max-width-container";
import Title from "../../components/title";
import Subtitle from "../../components/subtitle";
import JumboTitle from "../../components/jumbo-title";
import BackgroundStripe from "../../components/background-stripe";
import FaqElement from "../../components/faq-element";
import Section from "../../components/section";
import Divider from "../../components/divider";
import BenefitCarousel from "../../components/benefit-carousel";
import ImpactReport from "../../components/impact-report";

import HireBittoGraphic from "../../../static/images/hirebitto.png";
import Cycle2WorkGraphic from "../../../static/images/c2w.png";
import FarmingGraphic from "../../../static/images/farmers.png";

const projects = [
    {
        title: "Cycle2Work",
        caption: "For a healthier, happier world",
        text:
            "Cycle2Work.io is an app that rewards employees for commuting to work, whilst safeguarding the environment. It’s connected to the app Strava, where people can join their company team and earn € 0.20/km for cycling rather than driving to the office, as well as saving an average of 4.32 kg of CO2 each day! If you would like your company to take part in the programme, get in touch! ",
        link: "http://www.hirebitto.com/",
        button: "Visit Website",
        graphic: Cycle2WorkGraphic
    },
    {
        title: "HireBitto",
        caption: "Each one of us is responsible",
        text:
            "HireBitto is a project which benefits local farmers and cheesemakers who choose to work with traditional methods, without the use of chemicals or industrial machinery. For every new employee, the company buys a wheel of Storico Ribelle cheese. Once matured, the cheese is auctioned and the earnings are reinvested in the community. The cheese is paid for by mondora, but it belongs to the community. The employee is responsible for this benefit creation process.",
        link: "http://www.hirebitto.com/",
        button: "Visit Website",
        graphic: HireBittoGraphic
    },
    {
        title: "Hire a Farmer",
        caption: "Cultivating the soil",
        text:
            "mondora has a policy whereby for every 20 employees, the company hires a farmer to work the land and grow organic produce. There is a clause in all work contracts from 2017 onwards that states the joint responsibility of the company and the employee to ensure that this policy is upheld. We hire farmers because we believe their work is extremely important: without farming we would not be able to nourish ourselves, live a healthy life and get our work done!",
        link: "https://www.youtube.com/watch?v=joSs4zWNNpw",
        button: "Watch video",
        graphic: FarmingGraphic
    }
];

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

const BCorp = () => (
    <Layout>
        <BackgroundStripe>
            <MaxWidthContainer>
                <Section header={true}>
                    <Section.LeftContainer>
                        <Title>{"Mondora impact"}</Title>
                        <Subtitle margin="32px 0">
                            {
                                "In mondora we all work towards a shared purpose: making the world a better place. In fact, if you want to join the team, you first have to tell us how you will contribute to changing the world. You can focus on whatever you are most passionate about: an environmental issue, the local community, giving free coding classes to kids, teaching something to your colleagues… anything that has an impact!"
                            }
                        </Subtitle>
                    </Section.LeftContainer>

                    <Section.DividerContainer>
                        <Divider />
                    </Section.DividerContainer>

                    <Section.RightContainer>
                        <JumboTitle>
                            {"Let’s change the world together"}
                        </JumboTitle>
                    </Section.RightContainer>
                </Section>
            </MaxWidthContainer>
        </BackgroundStripe>

        <Title center={true}>{"Benefit Projects"}</Title>
        <BenefitCarousel projects={projects} />

        <MaxWidthContainer pb={5} justifyContent="center">
            <MaxWidthContainer p={4}>
                <Title center={true}>{"FAQ"}</Title>
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
            <MaxWidthContainer justifyContent="space-around">
                {reports.map(report => (
                    <ImpactReport
                        key={report.year}
                        width={[1, 3 / 4, 3 / 4, 1 / 3]}
                        report={report}
                    />
                ))}
            </MaxWidthContainer>
        </BackgroundStripe>
    </Layout>
);

export default BCorp;
