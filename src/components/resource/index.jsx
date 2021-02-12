import React from "react";
import PropTypes from "prop-types";

import { Flex, Box } from "reflexbox";

import styled from "styled-components";

import Title from "../title";
import SubtleTitle from "../subtle-title";
import Subtitle from "../subtitle";

import logo from "../../images/logo-square.png";
import SquareButton from "../square-button";

const Icon = styled.img`
    height: 100px;
`;

const RoundButton = styled.a`
    padding: 2px 8px;
    margin: 2px;
    line-height: 2;
    color: var(--black);
    border: 1px solid var(--variant-black);
    border-radius: 24px;
    text-decoration: none;
`;

const Resource = ({ data }) => (
    <Flex width="100%" flexWrap="wrap" p={4}>
        <Box p="2">
            <Icon src={logo} />
        </Box>
        <Box p="2">
            {data.areas.map((area, i) => (
                <SquareButton key={i} theme={"light"}>
                    {area}
                </SquareButton>
            ))}
            <Title>{data.title}</Title>
            <SubtleTitle>{data.date} </SubtleTitle>
            <Subtitle>{data.description.description}</Subtitle>

            {data.tags.map((tag, i) => (
                <RoundButton key={i} theme={"light"}>
                    {tag}
                </RoundButton>
            ))}
        </Box>
    </Flex>
);

Resource.propTypes = {
    data: PropTypes.object
};

export default Resource;
