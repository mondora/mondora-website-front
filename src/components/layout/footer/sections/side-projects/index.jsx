import React from "react";
import Grid from "../../../../grid";
import Title from "../title";
import InnerLink from "../../../../inner-link";

// TODO: review links
const SideProjects = props => (
    <Grid container direction="column" spacingRatio={2} {...props}>
        <Grid item>
            <Title>SIDE PROJECTS</Title>
        </Grid>
        <Grid item>
            <InnerLink to="/hirebitto">Hirebitto</InnerLink>
        </Grid>
        <Grid item>
            <InnerLink to="/hirebitto">Cycle2Work</InnerLink>
        </Grid>
        <Grid item>
            <InnerLink to="/hirebitto">Minicoder</InnerLink>
        </Grid>
    </Grid>
);

export default SideProjects;
