import React from "react";

import Layout from "../../components/layout";

import Header from "../../components/pages/about-us/header";
import WhoWeAre from "../../components/pages/about-us/who-we-are";
import WhereDoWeComeFrom from "../../components/pages/about-us/where-do-we-come-from";
import WhereAreWeDreamingOfGoingTogether from "../../components/pages/about-us/where-are-we-dreaming-of-going-together";

const About = () => (
    <Layout>
        <Header />
        <WhoWeAre />
        <WhereDoWeComeFrom />
        <WhereAreWeDreamingOfGoingTogether />
    </Layout>
);

export default About;
