import React from "react";
import { Link } from "gatsby";
import SquareButton from "../components/square-button";
import Layout from "../components/layout";
import Grid from "../components/grid";
import Header from "../components/homepage/header";
import WhatWeCanDo from "../components/homepage/what-we-can-do";
import Blog from "../components/homepage/blog";
import Benefit from "../components/homepage/benefit";
import About from "../components/homepage/about";

const Homepage = () => (
    <Layout>
        <Grid
            container
            xs={12}
            align="center"
            spacingRatio={6}
            direction="column"
        >
            <Grid item xs={11} md={11}>
                <Header />
            </Grid>
            <Grid item xs={11}>
                <WhatWeCanDo />
            </Grid>
            <Grid item justify="center" xs={11}>
                <Link to="/about">
                    <SquareButton>Services</SquareButton>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Blog />
            </Grid>
            <Grid item xs={12}>
                <Benefit />
            </Grid>
            <Grid item xs={12}>
                <About />
            </Grid>
        </Grid>
    </Layout>
);

export default Homepage;
