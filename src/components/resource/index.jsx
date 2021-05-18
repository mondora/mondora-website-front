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

const LinkIcon = styled.img`
    display: block;
    width: 40px;
    margin: auto;
`;

const LinkContainer = styled.a`
    text-decoration: none;
    color: black;
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
    text-decoration: none;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    &:hover {
        transition: 0.1s;
        box-shadow: 2px 2px 4px var(--primary);
    }
`;

const Areas = styled.div`
    margin: 4px 0;
    @media (max-width: 640px) {
        margin-top: 16px;
    }
`;

const Attributes = styled.div`
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
    <LinkContainer target="_blank" href={data.link}>
        <ResourceContainer flexDirection={"row"} mb={5} flexWrap="wrap">
            <MediaType>{data.type}</MediaType>
            <Box width={[0, 1 / 4]}>
                <Image
                    fluid={
                        data.featuredImageId
                            ? images.find(
                                  ({ image }) =>
                                      image &&
                                      image.contentful_id ===
                                          data.featuredImageId
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
                <Attributes>
                    {data.author}
                    {data.author && data.date && " - "}
                    {new Date(data.date).toLocaleDateString("fr-FR")}
                    {data.date && data.readTime && " - "}
                    {data.readTime}
                </Attributes>
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
                    <LinkIcon src={pointer} alt="link to resource" />
                </Hidden>
            </Box>
        </ResourceContainer>
    </LinkContainer>
);

Resource.propTypes = {
    data: PropTypes.object,
    images: PropTypes.array,
    placeholder: PropTypes.object
};

export default Resource;
