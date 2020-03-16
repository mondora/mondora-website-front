import React from "react";

import Layout from "../../components/layout";
import PageMetadata from "../../components/page-metadata";

import Header from "../../components/pages/about-us/header";
import WhoWeAre from "../../components/pages/about-us/who-we-are";
import WhereDoWeComeFrom from "../../components/pages/about-us/where-do-we-come-from";
import WhereAreWeDreamingOfGoingTogether from "../../components/pages/about-us/where-are-we-dreaming-of-going-together";

const About = () => (
    <Layout>
        <PageMetadata
            title="Software and advisory company specilized in custom cloud solutions - mondora"
            description="mondora: a passionate and dedicated team of over 60 full-stack software developers, UX designers, system administrators… and a few farmers!"
        />
        <Header />
        <WhoWeAre />
        <WhereDoWeComeFrom />
        <WhereAreWeDreamingOfGoingTogether />
    </Layout>
);

export default About;
