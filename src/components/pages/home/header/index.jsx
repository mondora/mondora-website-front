import React from "react";
import Grid from "../../../grid";
import Divider from "../../../divider";
import Title from "../../../title";
import FullWidthImage from "../../../full-width-image";
import Subtitle from "../../../subtitle";
import { graphql, useStaticQuery } from "gatsby";
import Image from "gatsby-image";

const Header = () => {
    const { headerImage, bCorpImage } = useStaticQuery(graphql`
        query {
            headerImage: file(relativePath: { eq: "home/header.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            bCorpImage: file(relativePath: { eq: "home/b-corp-logo.png" }) {
                childImageSharp {
                    fixed(width: 80) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (
        <Grid container xs={12} direction="column" spacingRatio={4}>
            <Grid item container xs={12} justify="center" align="stretch">
                <Grid
                    item
                    container
                    xs={12}
                    sm={5}
                    direction="column"
                    justify="center"
                >
                    <Grid item>
                        <Title>Welcome to the :mondora world!</Title>
                    </Grid>
                    <Grid item xs={12}>
                        <Subtitle>
                            Our aim is to create benefit for all stakeholders by
                            designing and building software solutions that
                            maximise positive impact. Together with our
                            customers and suppliers, we support humans and
                            nature with projects that benefit the community and
                            land.
                        </Subtitle>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={1} justify="center">
                    <Divider />
                </Grid>
                <Grid item xs={10} sm={5} justify="center" align="center">
                    <FullWidthImage fluid={headerImage.childImageSharp.fluid} />
                </Grid>
            </Grid>
            <Grid item container xs={12} justify="center">
                <Grid item justify="center">
                    <FullWidthImage fixed={bCorpImage.childImageSharp.fixed} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Header;
