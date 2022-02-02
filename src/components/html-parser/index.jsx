import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser, { processNodes } from "react-html-parser";

import styled from "styled-components";
import Title from "../title";
import Subtitle from "../subtitle";
import SubtleTitle from "../subtle-title";

const StyledLink = styled.a`
    color: var(--text-gray);

    &:hover {
        color: var(--text-dark-black);
    }
`;

function transform(node, index) {
    if (node.type === "tag") {
        if (node.name === "a") {
            return (
                <StyledLink
                    href={node.attribs.href}
                    target="_blank"
                    key={index}
                >
                    {processNodes(node.children, transform)}
                </StyledLink>
            );
        }
        if (node.name === "h2") {
            return (
                <Title key={index}>
                    {processNodes(node.children, transform)}
                </Title>
            );
        }
        if (node.name === "h3") {
            return (
                <SubtleTitle key={index}>
                    {processNodes(node.children, transform)}
                </SubtleTitle>
            );
        }
        if (node.name === "p") {
            return (
                <Subtitle key={index}>
                    {processNodes(node.children, transform)}
                </Subtitle>
            );
        }
    }
}

const options = {
    decodeEntities: true,
    transform
};

const HtmlParser = ({ html }) => {
    return <>{ReactHtmlParser(html, options)}</>;
};

HtmlParser.propTypes = {
    html: PropTypes.string
};

export default HtmlParser;
