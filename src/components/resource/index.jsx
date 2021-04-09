import React from "react";
import PropTypes from "prop-types";

import { Flex, Box } from "reflexbox";

import styled from "styled-components";

import Title from "../title";
import SubtleTitle from "../subtle-title";
import Subtitle from "../subtitle";
import ParagraphTitle from "../paragraph-title";
import RoundButton from "../round-button";

import logo from "../../images/logo-square.png";

const Icon = styled.img`
    height: 100px;
`;

const ResourceContainer = styled(Flex)`
    background-color: var(--white);
    margin-top: 64px;
    width: 100%;
`;

const AreaLabel = styled(ParagraphTitle)`
    display: inline-block;
    &::after {
        content: ", ";
        white-space: pre;
    }
    &:last-of-type ::after {
        content: "";
    }
`;

const Resource = ({ data }) => (
    <ResourceContainer flexDirection={"row"} flexWrap="wrap">
        <Box p="2" width={1 / 8}>
            <Icon src={logo} />
        </Box>
        <Box p="2" width={3 / 4}>
            <span>
                {data.areas.map((area, i) => (
                    <AreaLabel key={i}>{area}</AreaLabel>
                ))}
            </span>
            <Title>{data.title}</Title>
            <SubtleTitle>{data.date} </SubtleTitle>
            <Subtitle>{data.description}</Subtitle>

            {data.tags.map((tag, i) => (
                <RoundButton disabled key={i}>
                    {tag}
                </RoundButton>
            ))}
        </Box>
        <Box p="2" width={1 / 8}>
            <Icon src={logo} />
        </Box>
    </ResourceContainer>
);

Resource.propTypes = {
    data: PropTypes.object
};

export default Resource;
