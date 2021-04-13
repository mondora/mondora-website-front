import React from "react";
import PropTypes from "prop-types";

import { Flex, Box } from "reflexbox";

import styled from "styled-components";
import Image from "gatsby-image";

import Title from "../title";
import Subtitle from "../subtitle";
import ParagraphTitle from "../paragraph-title";
import RoundButton from "../round-button";

import pointer from "../../images/new-tab.svg";

const LinkIcon = styled.a`
    display: block;
    width: 40px;
    margin: auto;
`;

const ResourceContainer = styled(Flex)`
    background-color: var(--white);
    margin-bottom: 64px;
    width: 100%;
    align-items: center;
`;

const Areas = styled.div`
    margin: 4px 0;
`;

const Date = styled.div`
    font-size: 12px;
    margin: 20px 0 8px 0;
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

const Resource = ({ data, images, placeholder }) => (
    <ResourceContainer flexDirection={"row"} flexWrap="wrap">
        <Box p="2" width={1 / 4}>
            <Image
                fluid={
                    data.featuredImageId
                        ? images.find(
                              ({ image }) =>
                                  image &&
                                  image.contentful_id === data.featuredImageId
                          ).image.fluid
                        : placeholder.fluid
                }
            />
        </Box>
        <Box p="2" width={5 / 8}>
            <Areas>
                {data.areas.map((area, i) => (
                    <AreaLabel key={i}>{area}</AreaLabel>
                ))}
            </Areas>
            <Title>{data.title}</Title>
            <Date>{data.date} </Date>
            <Subtitle variant={"dark"} spacing={"16px"}>{data.description}</Subtitle>

            {data.tags.map((tag, i) => (
                <RoundButton disabled key={i}>
                    {tag}
                </RoundButton>
            ))}
        </Box>
        <Box p="2" width={1 / 8}>
            <LinkIcon href={data.link}>
                <img src={pointer} alt="link to resource" />
            </LinkIcon>
        </Box>
    </ResourceContainer>
);

Resource.propTypes = {
    data: PropTypes.object,
    images: PropTypes.array,
    placeholder: PropTypes.object
};

export default Resource;
