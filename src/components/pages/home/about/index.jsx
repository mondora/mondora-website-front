import React from "react";
import { AboutSection } from "./styled";
import Grid from "../../../grid";
import Title from "../../../title";
import Description from "../../../description";
import FullWidthImage from "../../../full-width-image";
import { useStaticQuery, graphql } from "gatsby";

const About = () => {
    const { brothersImage } = useStaticQuery(graphql`
        query {
            brothersImage: file(relativePath: { eq: "brothers.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <AboutSection item container justify="center">
            <Grid item container xs={12} align="center" justify="center">
                <Grid item xs={12} sm={5} justify="center">
                    <FullWidthImage
                        fluid={brothersImage.childImageSharp.fluid}
                    />
                </Grid>
                <Grid item container xs={11} sm={5}>
                    <Grid item xs={12} sm={10}>
                        <Title light>About Mondora</Title>
                        <Description light>
                            We are a team of open-minded and kind people who
                            always offer each other help to overcome obstacles
                            and create cutting edge solutions to problems.
                        </Description>
                    </Grid>
                </Grid>
            </Grid>
        </AboutSection>
    );
};

export default About;
