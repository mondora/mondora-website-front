import React from "react";
import PropTypes from "prop-types";

import { Flex, Box } from "reflexbox";

import styled from "styled-components";
import Image from "gatsby-image";

import Hidden from "../hidden";
import DefaultLink from "../link";
import Tag from "../tag";

import pointer from "../../images/new-tab.svg";

const Link = styled(DefaultLink)`
    text-decoration: none;
    color: var(--black);
`;

const Container = styled(Flex)`
    background-color: var(--white);
    width: 100%;
    text-decoration: none;
    position: relative;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    border: 3px solid var(--white);
    transition: all ease 0.3s;

    &:hover {
        border-color: var(--primary);
    }
`;

const MediaType = styled.div`
    padding: 6px 24px;
    font-size: 12px;
    text-align: center;
    text-transform: uppercase;
    position: absolute;
    top: -3px;
    left: -3px;
    background-color: var(--primary);
    z-index: 2;
`;

const Areas = styled.div`
    margin: 0 0 4px;
    font-size: 16px;
    font-weight: 600;

    @media (max-width: 640px) {
        margin-top: 16px;
    }
`;

const Title = styled.h3`
    font-size: 24px;
    margin: 0 0 8px;
`;

const Attributes = styled.div`
    font-size: 14px;
    margin: 0 0 24px;
`;

const Description = styled.p`
    font-size: 14px;
    margin: 0 0 24px;
`;

const LinkIcon = styled.img`
    display: block;
    width: 40px;
    margin: auto;
`;

const Resource = ({ data, images, placeholder }) => {
    const {
        link,
        type,
        featuredImageId,
        areas,
        title,
        author,
        date,
        readTime,
        tags,
        description
    } = data;

    const attributes = [
        author,
        new Date(date).toLocaleDateString("fr-FR"),
        readTime
    ];

    return (
        <Link target="_blank" to={link}>
            <Container
                flexDirection={"row"}
                mb={4}
                p={2}
                flexWrap="wrap"
                alignItems="center"
            >
                <MediaType>{type}</MediaType>
                <Box width={[0, 1 / 4]} pr={3}>
                    <Image
                        alt={title}
                        fluid={
                            featuredImageId
                                ? images.find(
                                      ({ image }) =>
                                          image &&
                                          image.contentful_id ===
                                              featuredImageId
                                  ).image.fluid
                                : placeholder.fluid
                        }
                    />
                </Box>
                <Box p={[4, 2, 2]} width={[1, 3 / 4, 5 / 8]}>
                    {areas && areas.length > 0 && (
                        <Areas>{areas.join(", ")}</Areas>
                    )}
                    {title && <Title>{title}</Title>}
                    {attributes && attributes.length > 0 && (
                        <Attributes>
                            {attributes.filter(attr => attr).join(" - ")}
                        </Attributes>
                    )}
                    {description && <Description>{description}</Description>}
                    {tags.map((tag, i) => (
                        <Tag disabled key={i}>
                            {tag}
                        </Tag>
                    ))}
                </Box>
                <Box p="2" width={[0, 0, 1 / 8]}>
                    <Hidden smDown={true}>
                        <LinkIcon src={pointer} alt="Link to resource" />
                    </Hidden>
                </Box>
            </Container>
        </Link>
    );
};

Resource.propTypes = {
    data: PropTypes.object,
    images: PropTypes.array,
    placeholder: PropTypes.object
};

export default Resource;
