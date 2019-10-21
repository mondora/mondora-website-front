import React from "react";
import Grid from "../../grid";
import Divider from "../../divider";
import HeaderImage from "../../../../static/images/mondora.png";
import BCorpLogo from "../../../../static/images/BCorp-logo.png";
import Title from "../title";
import Description from "../description";
import FullWidthImage from "../full-width-image";

const Header = () => (
    <Grid container xs={12} direction="column" spacingRatio={4}>
        <Grid item container xs={12} justify="center" align="stretch">
            <Grid
                item
                container
                xs={12}
                sm={5}
                direction="column"
                justify="center"
                align="center"
            >
                <Grid item xs={12}>
                    <Title>Welcome to the :mondora world!</Title>
                    <Description>
                        Our aim is to create benefit for all stakeholders by
                        designing and building software solutions that maximise
                        positive impact. Together with our customers and
                        suppliers, we support humans and nature with projects
                        that benefit the community and land.
                    </Description>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={1} justify="center">
                <Divider hideOnMobile />
            </Grid>
            <Grid item xs={10} sm={5} justify="center" align="center">
                <FullWidthImage src={HeaderImage} />
            </Grid>
        </Grid>
        <Grid item container xs={12} justify="center">
            <Grid item xs={2} sm={1}>
                <FullWidthImage src={BCorpLogo} />
            </Grid>
        </Grid>
    </Grid>
);

export default Header;
