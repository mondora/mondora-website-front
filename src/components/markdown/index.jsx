import React from "react";

import PropTypes from "prop-types";
import rehypeReact from "rehype-react";
import styled from "styled-components";

import Link from "../link";

const PrimaryTitle = styled.h1`
    font-weight: 400;
    font-size: 2em;

    @media (min-width: ${props => props.theme.breakpoints[1]}px) {
        font-size: 3em;
    }
`;

const SecondaryTitle = styled.h2`
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1.75em;
    font-weight: 600;
    margin: calc(1.25em + 0.15vw) 0 calc(0.75em + 0.15vw);

    @media (min-width: ${props => props.theme.breakpoints[1]}px) {
        font-size: 2em;
    }
`;

const TertiaryTitle = styled.h3`
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1.5em;
    font-weight: 600;
    margin: calc(1em + 0.15vw) 0 calc(0.75em + 0.15vw);

    @media (min-width: ${props => props.theme.breakpoints[1]}px) {
        font-size: 1.5em;
    }
`;

const Paragraph = styled.p`
    font-size: calc(1em + 0.15vw);
    line-height: 1.7em;
    margin: 0 0 1em;
    color: var(--text-gray);
`;

const Bold = styled.strong`
    color: var(--text-dark-black);
`;

const ListElement = styled.li`
    font-size: calc(1em + 0.15vw);
    line-height: 1.7em;
    color: var(--text-gray);
`;

const BlockQuote = styled.blockquote`
    font-size: calc(1.4em + 0.15vw);
    font-family: "Playfair Display", serif;
    font-weight: 400;
`;

const Table = styled.table`
    font-size: calc(1em + 0.15vw);
    width: 100%;
    margin: 0 0 2em;
    border-spacing: 0;

    th {
        padding: 1em;
        text-align: left;
        border-bottom: 1px solid var(--background-dark-gray);
    }

    td {
        padding: 1em;
        border-bottom: 1px solid var(--text-light-gray);
    }
`;

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        h1: PrimaryTitle,
        h2: SecondaryTitle,
        h3: TertiaryTitle,
        p: Paragraph,
        strong: Bold,
        a: Link,
        li: ListElement,
        blockquote: BlockQuote,
        table: Table
    }
}).Compiler;

const Markdown = ({ data }) => <>{renderAst(data)}</>;

Markdown.propTypes = {
    data: PropTypes.object
};

export default Markdown;
