import React from "react";
import Grid from "../../../grid";
import { Item } from "./styled";
import Title from "../../../title";
import Description from "../../../description";
import Subtitle from "../../../subtitle";

const WhatWeCanDo = () => (
    <Grid container xs={12} direction="column" align="center" spacingRatio={6}>
        <Grid item xs={12} sm={10} md={8} justify="center">
            <Grid item>
                <h1>What we can do for you</h1>
            </Grid>
            <Grid item>
                <Subtitle>
                    Our aim is to create benefit for all stakeholders through
                    software solutions designed for positive impact. Together
                    with our customers and suppliers, we support humans and
                    nature with projects that benefit the community and land.
                </Subtitle>
            </Grid>
        </Grid>
        <Grid item container xs={10} spacingRatio={8}>
            <Grid item xs={10} sm={4}>
                <Item>
                    <Title>Failure party</Title>
                    <Description>
                        We are a team of explorers who are allowed to have
                        failure parties when we try to learn something new and
                        mess up.
                    </Description>
                </Item>
            </Grid>
            <Grid item xs={10} sm={4}>
                <Item>
                    <Title>Passions</Title>
                    <Description>
                        This mix of qualities and passions allows us to push
                        boundaries and keep learning and innovating. So if you
                        have a challenging project for us… bring it on!
                    </Description>
                </Item>
            </Grid>
            <Grid item xs={10} sm={4}>
                <Item>
                    <Title>Experimenting</Title>
                    <Description>
                        Right now we are experimenting with, and would like to
                        work more on: machine learning, artificial intelligence,
                        augmented reality, blockchain...and more
                    </Description>
                </Item>
            </Grid>
        </Grid>
    </Grid>
);

export default WhatWeCanDo;
