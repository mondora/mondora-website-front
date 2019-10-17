import React from "react";
import Grid from "../../../../Grid";
import Title from "../title";
import InnerLink from "../../../../inner-link";

// TODO: review links
const WorkWithUs = props => (
    <Grid container direction="column" spacingRatio={2} {...props}>
        <Grid item>
            <Title>WORK WITH US</Title>
        </Grid>
        <Grid item>
            <InnerLink to="/work-with-us">Work with us</InnerLink>
        </Grid>
        <Grid item>
            <InnerLink to="/handbook">Our handbook</InnerLink>
        </Grid>
    </Grid>
);

export default WorkWithUs;
