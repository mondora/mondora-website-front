import React from "react";
import Grid from "../../../grid";
import InfoAndSocials from "../sections/info-and-socials";
import About from "../sections/about";
import WorkWithUs from "../sections/work-with-us";
import Impact from "../sections/impact";
import SideProjects from "../sections/side-projects";
import MiniLogo from "../../mini-logo";

const DesktopFooter = () => (
    <Grid container justify="center">
        <Grid item container xs={11} spacingRatio={4}>
            <Grid item>
                <MiniLogo />
            </Grid>
            <Grid item container>
                <InfoAndSocials />
            </Grid>
            <Grid item grow={1} />
            <Grid item container spacingRatio={8}>
                <Grid item container>
                    <Grid item>
                        <About />
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item>
                        <WorkWithUs />
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item>
                        <Impact />
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item>
                        <SideProjects />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default DesktopFooter;
