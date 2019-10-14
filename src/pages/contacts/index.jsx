import React from "react";

import { Layout } from "../../components/layout";
import Divider from "../../components/divider";

import { Grid } from "../../components/grid";
import { KeepInTouch } from "../../components/contacts/keep-in-touch";
import { WhereToFindUs } from "../../components/contacts/where-to-find-us";
import { Map } from "../../components/contacts/map";

export default () => (
    <Layout>
        <Grid container direction="column" spacingRatio={6}>
            <Grid container justify="center">
                <Grid
                    item
                    container
                    align="stretch"
                    justify="center"
                    xs={12}
                    md={10}
                >
                    <Grid container item xs={11} md={5} justify="center">
                        <KeepInTouch />
                    </Grid>
                    <Grid item>
                        <Divider hideOnMobile />
                    </Grid>
                    <Grid item container xs={11} md={5} justify="center">
                        <WhereToFindUs />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Map />
            </Grid>
        </Grid>
    </Layout>
);
