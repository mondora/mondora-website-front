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
            <Section.LeftContainer sideOnTop={"left"}>
                <Image src={project.graphic} />
            </Section.LeftContainer>

            <Section.RightContainer sideOnTop={"left"}>
                <Flex flexDirection="column" justifyContent="center">
                    <SubtleTitle>{project.caption}</SubtleTitle>
                    <Title>{project.title}</Title>
                    <Subtitle margin="24px 0">{project.text}</Subtitle>
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
