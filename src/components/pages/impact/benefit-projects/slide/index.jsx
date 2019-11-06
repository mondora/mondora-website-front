import React from "react";
import PropTypes from "prop-types";
import Grid from "../../../../grid";
import FullWidthImage from "../../../../full-width-image";
import Title from "../../../../title";
import Description from "../../../../description";
import SquareButton from "../../../../square-button";
import { Link } from "gatsby";
import Hidden from "../../../../hidden";
import { CenteredDescription } from "./styled";

const Slide = ({ image, miniTitle, title, description, link }) => (
    <>
        <Hidden smDown>
            <Grid
                item
                container
                xs={12}
                direction="column"
                align="center"
                spacingRatio={8}
            >
                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    align="center"
                    spacingRatio={8}
                >
                    <Grid
                        item
                        container
                        xs={10}
                        justify="space-around"
                        align="center"
                    >
                        <Grid item sm={5} direction="column">
                            <FullWidthImage fluid={image} />
                        </Grid>
                        <Grid
                            item
                            container
                            sm={5}
                            direction="column"
                            spacingRatio={4}
                        >
                            <Grid item xs={12}>
                                <Title mini>{miniTitle}</Title>
                            </Grid>
                            <Grid item xs={12}>
                                <Title>{title}</Title>
                            </Grid>
                            <Grid item>
                                <Description>{description}</Description>
                            </Grid>
                            <Grid item>
                                <SquareButton externalLink={link}>
                                    Visit website
                                </SquareButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Hidden>
        <Hidden smUp>
            <Grid
                item
                container
                xs={12}
                direction="column"
                align="center"
                spacingRatio={8}
            >
                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    align="center"
                    spacingRatio={8}
                >
                    <Grid
                        item
                        container
                        xs={10}
                        direction="column"
                        align="center"
                        spacingRatio={4}
                    >
                        <Grid item xs={12}>
                            <FullWidthImage fluid={image} />
                        </Grid>
                        <Grid item>
                            <Title mini>{miniTitle}</Title>
                        </Grid>
                        <Grid item>
                            <Title>{title}</Title>
                        </Grid>
                        <Grid item>
                            <CenteredDescription>
                                {description}
                            </CenteredDescription>
                        </Grid>
                        <Grid item>
                            <SquareButton externalLink={link}>
                                Visit website
                            </SquareButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Hidden>
    </>
);

Slide.propTypes = {
    image: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Slide;
