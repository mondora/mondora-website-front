import React from "react";

import Layout from "../../components/layout";
import Grid from "../../components/grid";
import Header from "../../components/pages/impact/header";
import BenefitProjects from "../../components/pages/impact/benefit-projects";
import Faq from "../../components/pages/impact/faq";
import Reports from "../../components/pages/impact/reports";

const Impact = () => (
    <Layout>
        <Grid container direction="column" spacingRatio={8}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <BenefitProjects />
            </Grid>
            <Grid item xs={12}>
                <Faq />
            </Grid>
            <Grid item xs={12}>
                <Reports />
            </Grid>
        </Grid>
    </Layout>
);

export default Impact;
