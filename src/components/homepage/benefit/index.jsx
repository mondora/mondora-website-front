import React from "react";
import Grid from "../../grid";
import Divider from "../../divider";
import { Link } from "gatsby";
import SquareButton from "../../square-button";
import ImpactsImage from "../../../../static/images/impacts.png";
import Description from "../description";
import FullWidthImage from "../full-width-image";

const Benefit = () => (
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
            <Grid item container xs={12} sm={5} align="center" justify="center">
                <Grid
                    item
                    container
                    xs={12}
                    sm={10}
                    spacingRatio={3}
                    direction="column"
                >
                    <Grid item>
                        <h1>Benefit projects</h1>
                    </Grid>
                    <Grid item>
                        <Description>
                            We are a team of open-minded and kind people who
                            always offer each other help to overcome obstacles
                            and create cutting edge solutions to problems.
                        </Description>
                    </Grid>
                    <Grid item>
                        <Link to="/bcorp">
                            <SquareButton>Impact</SquareButton>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={8}>
            <FullWidthImage src={ImpactsImage} />
        </Grid>
    </Grid>
);

export default Benefit;
