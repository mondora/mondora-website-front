import React from "react";
import Grid from "../../../grid";
import Divider from "../../../divider";
import Title from "../../../title";
import {
    ImpactfulTitle,
    TextCenterAlignedGrid,
    MarginGrid,
    DesktopRootGrid
} from "./styled";
import Subtitle from "../../../subtitle";
import Hidden from "../../../hidden";

const Header = () => (
    <>
        <Hidden smDown>
            <DesktopRootGrid
                container
                xs={12}
                direction="column"
                align="center"
                spacingRatio={4}
            >
                <MarginGrid
                    item
                    container
                    xs={11}
                    md={10}
                    lg={8}
                    xl={6}
                    justify="space-between"
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
                        <Grid item container xs={12}>
                            <Grid item>
                                <Title>Mondora's impact</Title>
                            </Grid>
                            <Grid item>
                                <Subtitle>
                                    In Mondora we all work towards a shared
                                    purpose: making the world a better place. In
                                    fact, if you want to join the team, you
                                    first have to tell us how you will
                                    contribute to changing the world. You can
                                    focus on whatever you are most passionate
                                    about: an environmental issue, the local
                                    community, giving free coding classes to
                                    kids, teaching something to your colleagues…
                                    anything that has an impact!
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
                        <ImpactfulTitle>
                            Let’s change the world together
                        </ImpactfulTitle>
                    </TextCenterAlignedGrid>
                </MarginGrid>
            </DesktopRootGrid>
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
                    <ImpactfulTitle>
                        Let’s change the world together
                    </ImpactfulTitle>
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
                        <Grid item xs={10} justify="center">
                            <Title>Mondora's impact</Title>
                        </Grid>
                        <Grid item xs={10}>
                            <Subtitle>
                                In Mondora we all work towards a shared purpose:
                                making the world a better place. In fact, if you
                                want to join the team, you first have to tell us
                                how you will contribute to changing the world.
                                You can focus on whatever you are most
                                passionate about: an environmental issue, the
                                local community, giving free coding classes to
                                kids, teaching something to your colleagues…
                                anything that has an impact!
                            </Subtitle>
                        </Grid>
                    </Grid>
                </TextCenterAlignedGrid>
            </MarginGrid>
        </Hidden>
    </>
);

export default Header;
