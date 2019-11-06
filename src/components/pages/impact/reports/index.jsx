import React from "react";
import { PaddedBackgroundDecoratedGrid } from "../../about-us/styled";
import { ReportGrid } from "./styled";
import Title from "../../../title";
import SquareButton from "../../../square-button";
import { Link } from "gatsby";
import Grid from "../../../grid";
import Hidden from "../../../hidden";

const reports = [
    {
        year: 2016,
        title: "Impact report 2016",
        to: "/report2016.pdf"
    },
    {
        year: 2017,
        title: "Impact report 2017",
        to: "/report2017.pdf"
    },
    {
        year: 2018,
        title: "Impact report 2018",
        to: "/report2018.pdf"
    }
];

const Reports = () => (
    <>
        <Hidden smDown>
            <PaddedBackgroundDecoratedGrid container justify="center" xs={12}>
                <Grid item container xs={11} justify="space-around">
                    {reports.map(({ year, title, link }, index) => (
                        <ReportGrid item container spacingRatio={8}>
                            <Grid
                                item
                                container
                                direction="column"
                                align="center"
                                spacingRatio={4}
                            >
                                <Grid item>
                                    <Title>{title}</Title>
                                </Grid>
                                <Grid item>
                                    <SquareButton internalLink={link}>
                                        Leggi il report
                                    </SquareButton>
                                </Grid>
                            </Grid>
                        </ReportGrid>
                    ))}
                </Grid>
            </PaddedBackgroundDecoratedGrid>
        </Hidden>
        <Hidden smUp>
            <PaddedBackgroundDecoratedGrid
                container
                direction="column"
                align="center"
                xs={12}
            >
                <Grid item container direction="column" xs={10}>
                    {reports.map(({ year, title, link }, index) => (
                        <ReportGrid
                            item
                            container
                            spacingRatio={8}
                            xs={12}
                            direction="column"
                            align="center"
                        >
                            <Grid
                                item
                                container
                                direction="column"
                                align="center"
                                spacingRatio={4}
                                xs={12}
                            >
                                <Grid item>
                                    <Title>{title}</Title>
                                </Grid>
                                <Grid item>
                                    <SquareButton internalLink={link}>
                                        Leggi il report
                                    </SquareButton>
                                </Grid>
                            </Grid>
                        </ReportGrid>
                    ))}
                </Grid>
            </PaddedBackgroundDecoratedGrid>
        </Hidden>
    </>
);

export default Reports;
