import React from "react";
import Grid from "../../../grid";
import InfoAndSocials from "../sections/info-and-socials";
import MiniLogo from "../mini-logo";
import Impact from "../sections/impact";
import SideProjects from "../sections/side-projects";
import About from "../sections/about";
import WorkWithUs from "../sections/work-with-us";

export const MobileFooter = () => (
    <Grid container justify="center" xs={12}>
        <Grid item container spacingRatio={8} direction="column" align="center">
            <Grid item container spacingRatio={4} direction="column" xs={12}>
                <Grid item container xs={12}>
                    <Grid item container xs={6} justify="center">
                        <Grid item>
                            <About align="center" />
                        </Grid>
                    </Grid>
                    <Grid item container xs={6} justify="center">
                        <Grid item>
                            <WorkWithUs align="center" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12} justify="space-evenly">
                    <Grid item container xs={6} justify="center">
                        <Grid item>
                            <Impact align="center" />
                        </Grid>
                    </Grid>
                    <Grid item container xs={6} justify="center">
                        <Grid item>
                            <SideProjects align="center" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <InfoAndSocials align="center" />
            </Grid>
            <Grid item>
                <MiniLogo />
            </Grid>
        </Grid>
    </Grid>
);

export default MobileFooter;
