import React from "react";
import { AboutSection } from "./styled";
import Grid from "../../grid";
import AboutImage from "../../../../static/images/brothers.png";
import Title from "../title";
import Description from "../description";
import FullWidthImage from "../full-width-image";

const About = () => (
    <AboutSection item container justify="center">
        <Grid item container xs={12} align="center" justify="center">
            <Grid item xs={12} sm={5} justify="center">
                <FullWidthImage src={AboutImage} />
            </Grid>
            <Grid item container xs={11} sm={5}>
                <Grid item xs={12} sm={10}>
                    <Title light>About Mondora</Title>
                    <Description light>
                        We are a team of open-minded and kind people who always
                        offer each other help to overcome obstacles and create
                        cutting edge solutions to problems.
                    </Description>
                </Grid>
            </Grid>
        </Grid>
    </AboutSection>
);

export default About;
