import React from "react";

import Layout from "../../components/layout";

import Grid from "../../components/grid";
import Header from "../../components/pages/about-us/header";
import WhoWeAre from "../../components/pages/about-us/who-we-are";
import WhereDoWeComeFrom from "../../components/pages/about-us/where-do-we-come-from";
import WhereAreWeDreamingOfGoingTogether from "../../components/pages/about-us/where-are-we-dreaming-of-going-together";

const About = () => (
    <Layout>
        <Grid
            container
            xs={12}
            align="center"
            spacingRatio={8}
            direction="column"
        >
            <Grid item xs={11}>
                <Header />
            </Grid>
            <Grid item xs={12} justify="center">
                <WhoWeAre />
                <WhereDoWeComeFrom />
                <WhereAreWeDreamingOfGoingTogether />
            </Grid>
        </Grid>
    </Layout>
);

export default About;
