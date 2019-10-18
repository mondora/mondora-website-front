import React from "react";
import Grid from "../../../../grid";
import Title from "../title";
import InnerLink from "../../../../inner-link";

// TODO: review links
const About = props => (
    <Grid container direction="column" spacingRatio={1} {...props}>
        <Grid item>
            <Title>ABOUT</Title>
        </Grid>
        <Grid item>
            <InnerLink to="/about">About us</InnerLink>
        </Grid>
        <Grid item>
            <InnerLink to="/meet-the-team">Meet the team</InnerLink>
        </Grid>
        <Grid item>
            <InnerLink to="/contacts">Contacts</InnerLink>
        </Grid>
    </Grid>
);

export default About;
