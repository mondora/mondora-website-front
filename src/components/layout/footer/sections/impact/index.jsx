import React from "react";
import Grid from "../../../../Grid";
import Title from "../title";
import InnerLink from "../../../../inner-link";

// TODO: review links
const Impact = props => (
    <Grid container direction="column" spacingRatio={2} {...props}>
        <Grid item>
            <Title>IMPACT</Title>
        </Grid>
        <Grid item>
            <InnerLink to="/impact">Impact</InnerLink>
        </Grid>
        <Grid item>
            <InnerLink to="/impact">Blog BClam BCorp</InnerLink>
        </Grid>
        <Grid item>
            <InnerLink to="/impact">Blog tecnico</InnerLink>
        </Grid>
    </Grid>
);

export default Impact;
