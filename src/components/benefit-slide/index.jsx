import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Flex } from "reflexbox";

import SubtleTitle from "../subtle-title";
import Title from "../title";
import SquareButton from "../square-button";
import Subtitle from "../subtitle";
import Section from "../section";

const Image = styled.img`
    width: 100%;
`;

const BenefitSlide = ({ project }) => {
    return (
        <Section>
            <Section.LeftContainer>
                <Image src={project.graphic} />
            </Section.LeftContainer>

            <Section.RightContainer>
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                >
                    <SubtleTitle>{project.caption}</SubtleTitle>
                    <Title>{project.title}</Title>
                    <Subtitle>{project.text}</Subtitle>
                    <SquareButton>{project.button}</SquareButton>
                </Flex>
            </Section.RightContainer>
        </Section>
    );
};

BenefitSlide.propTypes = {
    project: PropTypes.object
};

export default BenefitSlide;
