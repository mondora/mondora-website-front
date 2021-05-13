import React from "react";
import PropTypes from "prop-types";

import { Flex, Box } from "reflexbox";

import styled from "styled-components";
import Image from "gatsby-image";

import Title from "../title";
import Subtitle from "../subtitle";
import ParagraphTitle from "../paragraph-title";
import RoundButton from "../round-button";
import Hidden from "../hidden";

import pointer from "../../images/new-tab.svg";

const LinkIcon = styled.a`
    display: block;
    width: 40px;
    margin: auto;
`;

const MediaType = styled.div`
    width: 80px;
    padding: 4px;
    text-align: center;
    position: absolute;
    align-self: start;
    @media (max-width: 640px) {
        right: 32px;
    }
    background-color: var(--primary);
    z-index: 2;
`;

const ResourceContainer = styled(Flex)`
    background-color: var(--white);
    width: 100%;
    align-items: center;
`;

const Areas = styled.div`
    margin: 4px 0;
    @media (max-width: 640px) {
        margin-top: 16px;
    }
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
    <ResourceContainer flexDirection={"row"} mb={5} flexWrap="wrap">
        <MediaType>{data.type}</MediaType>
        <Box width={[0, 1 / 4]}>
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
        <Box p={[4, 2, 2]} width={[1, 3 / 4, 5 / 8]}>
            <Areas>
                {data.areas.map((area, i) => (
                    <AreaLabel key={i}>{area}</AreaLabel>
                ))}
            </Areas>
            <Title>{data.title}</Title>
            <Date>{data.date} </Date>
            <Subtitle variant={"dark"} spacing={"16px"}>
                {data.description}
            </Subtitle>

            {data.tags.map((tag, i) => (
                <RoundButton disabled key={i}>
                    {tag}
                </RoundButton>
            ))}
        </Box>

        <Box p="2" width={[0, 0, 1 / 8]}>
            <Hidden smDown={true}>
                <LinkIcon href={data.link}>
                    <img src={pointer} alt="link to resource" />
                </LinkIcon>
            </Hidden>
        </Box>
    </ResourceContainer>
);

Resource.propTypes = {
    data: PropTypes.object,
    images: PropTypes.array,
    placeholder: PropTypes.object
};

export default Resource;
