import React from "react";
import Grid from "../../../grid";
import Divider from "../../../divider";
import { Link, useStaticQuery, graphql } from "gatsby";
import SquareButton from "../../../square-button";
import Description from "../../../description";
import FullWidthImage from "../../../full-width-image";

const Benefit = () => {
    const { impactImage } = useStaticQuery(graphql`
        query {
            impactImage: file(relativePath: { eq: "home/impact.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <Grid
            container
            xs={12}
            justify="center"
            align="center"
            spacingRatio={6}
            direction="column"
        >
            <Grid item container xs={11} justify="center" align="stretch">
                <Grid item xs={12} sm={5} justify="flex-end">
                    <Divider hideOnMobile />
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    sm={5}
                    align="center"
                    justify="center"
                >
                    <Grid
                        item
                        container
                        xs={12}
                        sm={10}
                        spacingRatio={3}
                        direction="column"
                        align="center"
                    >
                        <Grid item>
                            <h1>Benefit projects</h1>
                        </Grid>
                        <Grid item>
                            <Description>
                                We are a team of open-minded and kind people who
                                always offer each other help to overcome
                                obstacles and create cutting edge solutions to
                                problems.
                            </Description>
                        </Grid>
                        <Grid item>
                            <Link to="/impact">
                                <SquareButton>Impact</SquareButton>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <FullWidthImage fluid={impactImage.childImageSharp.fluid} />
            </Grid>
        </Grid>
    );
};

export default Benefit;
