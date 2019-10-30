import React from "react";
import Grid from "../../../grid";
import InfoAndSocials from "../sections/info-and-socials";
import About from "../sections/about";
import WorkWithUs from "../sections/work-with-us";
import Impact from "../sections/impact";
import SideProjects from "../sections/side-projects";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

const DesktopFooter = () => {
    const { miniLogoImage } = useStaticQuery(graphql`
        query {
            miniLogoImage: file(relativePath: { eq: "logo/small-light.png" }) {
                childImageSharp {
                    fixed(width: 40) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (
        <Grid container justify="center">
            <Grid item container xs={11} spacingRatio={4}>
                <Grid item>
                    <Image fixed={miniLogoImage.childImageSharp.fixed} />
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
};

export default DesktopFooter;
