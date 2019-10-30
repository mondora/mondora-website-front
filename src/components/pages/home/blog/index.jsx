import React from "react";
import Grid from "../../../grid";
import { Container, UndecoratedLink } from "./styled";
import BlogFeed from "../../../blog-feed";
import SquareButton from "../../../square-button";

const Blog = () => (
    <Grid item container xs={12}>
        <Container xs={12} direction="column" justify="center" align="center">
            <h1>From our blog</h1>
            <BlogFeed />
            <UndecoratedLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://bcalmbcorp.com/"
            >
                <SquareButton>Visit our blog</SquareButton>
            </UndecoratedLink>
        </Container>
    </Grid>
);

export default Blog;
