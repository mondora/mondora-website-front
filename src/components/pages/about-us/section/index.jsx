import React from "react";
import PropTypes from "prop-types";
import Hidden from "../../../hidden";
import Grid from "../../../grid";
import { FullWidthImage, MarginFullWidthImage } from "./styled";
import Title from "../../../title";
import Subtitle from "../../../subtitle";
import Description from "../../../description";
import { useStaticQuery, graphql } from "gatsby";
import { PaddedBackgroundDecoratedGrid } from "../styled";

export const Section = ({
    rightImage,
    image,
    miniTitle,
    title,
    subtitle,
    voices,
    dark,
    additionalText
}) => {
    const { underlinesImage } = useStaticQuery(graphql`
        query {
            underlinesImage: file(relativePath: { eq: "underlines.svg" }) {
                publicURL
            }
        }
    `);

    return (
        <>
            <Hidden smUp>
                <PaddedBackgroundDecoratedGrid
                    item
                    container
                    xs={12}
                    direction="column"
                    align="center"
                    dark={dark}
                >
                    <Grid
                        item
                        container
                        direction="column"
                        xs={11}
                        align="center"
                        spacingRatio={8}
                    >
                        <Grid item xs={12}>
                            <FullWidthImage fluid={image} />
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            sm={5}
                            direction="column"
                            spacingRatio={8}
                        >
                            <Grid item>
                                <Title mini light={dark}>
                                    {miniTitle}
                                </Title>
                            </Grid>
                            <Grid item direction="column">
                                <Title light={dark}>{title}</Title>
                            </Grid>
                            <Grid item>
                                <Subtitle light={dark}>{subtitle}</Subtitle>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="column"
                            align="center"
                            xs={10}
                            spacingRatio={8}
                        >
                            {voices.map(({ key, title, description }) => (
                                <Grid
                                    item
                                    container
                                    key={key}
                                    direction="column"
                                    align="center"
                                >
                                    <Grid item>
                                        <Title light={dark}>{title}</Title>
                                    </Grid>
                                    <Grid item>
                                        <Description light={dark}>
                                            {description}
                                        </Description>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        {additionalText && (
                            <Grid item xs={11} justify="center">
                                <Subtitle light={dark}>
                                    {additionalText}
                                </Subtitle>
                            </Grid>
                        )}
                    </Grid>
                </PaddedBackgroundDecoratedGrid>
            </Hidden>
            <Hidden smDown>
                <PaddedBackgroundDecoratedGrid
                    item
                    container
                    xs={12}
                    direction="column"
                    align="center"
                    spacingRatio={8}
                    dark={dark}
                >
                    <Grid
                        item
                        container
                        xs={11}
                        xl={6}
                        justify="space-around"
                        align="stretch"
                    >
                        {!rightImage && (
                            <Grid item xs={12} sm={5} direction="column">
                                <FullWidthImage fluid={image} />
                            </Grid>
                        )}
                        <Grid
                            item
                            container
                            xs={12}
                            sm={5}
                            direction="column"
                            spacingRatio={4}
                        >
                            <Grid item>
                                <Title mini light={dark}>
                                    {miniTitle}
                                </Title>
                            </Grid>
                            <Grid item direction="column" xs={12}>
                                <Title light={dark}>{title}</Title>
                            </Grid>
                            <Grid item>
                                <Subtitle light={dark}>{subtitle}</Subtitle>
                            </Grid>
                            <Grid item xs={3}>
                                <MarginFullWidthImage
                                    fluid={underlinesImage.publicURL}
                                />
                            </Grid>
                        </Grid>
                        {rightImage && (
                            <Grid item xs={12} sm={5} direction="column">
                                <FullWidthImage fluid={image} />
                            </Grid>
                        )}
                    </Grid>
                    <Grid
                        item
                        container
                        xs={10}
                        xl={6}
                        spacingRatio={12}
                        justify="center"
                    >
                        {voices.map(({ key, title, description }) => (
                            <Grid key={key} item xs={10} sm={4}>
                                <Title light={dark}>{title}</Title>
                                <Description light={dark}>
                                    {description}
                                </Description>
                            </Grid>
                        ))}
                    </Grid>
                    {additionalText && (
                        <Grid item sm={10} md={8} xl={4} justify="center">
                            <Subtitle light={dark}>{additionalText}</Subtitle>
                        </Grid>
                    )}
                </PaddedBackgroundDecoratedGrid>
            </Hidden>
        </>
    );
};

Section.propTypes = {
    rightImage: PropTypes.bool,
    image: PropTypes.object.isRequired,
    miniTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    voices: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired,
    dark: PropTypes.bool,
    additionalText: PropTypes.node
};
