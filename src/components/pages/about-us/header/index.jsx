import React from "react";
import Grid from "../../../grid";
import Divider from "../../../divider";
import Title from "../../../title";
import { ImpactfulTitle, TextCenterAlignedGrid, MarginGrid } from "./styled";
import Subtitle from "../../../subtitle";
import Hidden from "../../../hidden";

const Header = () => (
    <>
        <Hidden smDown>
            <Grid
                container
                xs={12}
                direction="column"
                align="center"
                spacingRatio={4}
            >
                <MarginGrid
                    item
                    container
                    xs={12}
                    xl={6}
                    justify="center"
                    align="stretch"
                >
                    <Grid
                        item
                        container
                        xs={12}
                        sm={5}
                        direction="column"
                        justify="center"
                        align="center"
                    >
                        <Grid item container justify="center" xs={12}>
                            <Grid item xs={10}>
                                <Title>
                                    We Design and Build Software that generates
                                    Positive Impact
                                </Title>
                            </Grid>
                            <Grid item xs={10}>
                                <Subtitle>
                                    Mondora is a software and advisory company
                                    specialising in custom cloud solutions for
                                    all kinds of businesses.
                                </Subtitle>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={1} justify="center">
                        <Divider />
                    </Grid>
                    <TextCenterAlignedGrid
                        item
                        xs={10}
                        sm={5}
                        justify="center"
                        align="center"
                    >
                        <ImpactfulTitle>Be the change</ImpactfulTitle>
                    </TextCenterAlignedGrid>
                </MarginGrid>
            </Grid>
        </Hidden>
        <Hidden smUp>
            <MarginGrid
                container
                xs={12}
                direction="column"
                align="center"
                spacingRatio={4}
            >
                <TextCenterAlignedGrid
                    item
                    xs={10}
                    justify="center"
                    align="center"
                >
                    <ImpactfulTitle>Be the change</ImpactfulTitle>
                </TextCenterAlignedGrid>
                <Grid item xs={12} justify="center">
                    <Divider />
                </Grid>
                <TextCenterAlignedGrid
                    item
                    container
                    xs={12}
                    direction="column"
                    justify="center"
                    align="center"
                >
                    <Grid item container justify="center" xs={12}>
                        <Grid item xs={10}>
                            <Title>
                                We Design and Build Software that generates
                                Positive Impact
                            </Title>
                        </Grid>
                        <Grid item xs={10}>
                            <Subtitle>
                                Mondora is a software and advisory company
                                specialising in custom cloud solutions for all
                                kinds of businesses.
                            </Subtitle>
                        </Grid>
                    </Grid>
                </TextCenterAlignedGrid>
            </MarginGrid>
        </Hidden>
    </>
);

export default Header;
