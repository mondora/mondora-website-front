import React from "react";

import { Container, UndecoratedLink } from "./styled";

import BlogFeed from "../../../blog-feed";
import SquareButton from "../../../square-button";
import BackgroundDecoratedGrid from "../../../background-decorated-grid";

const Blog = () => (
    <BackgroundDecoratedGrid theme="light">
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
    </BackgroundDecoratedGrid>
);

export default Blog;
