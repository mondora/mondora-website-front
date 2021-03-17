import React from "react";
import PropTypes from "prop-types";

import Image from "gatsby-image";

import { Flex } from "reflexbox";

import Button from "../button";
import SubtleTitle from "../subtle-title";
import Title from "../title";
import Subtitle from "../subtitle";
import Section from "../section";

const BenefitSlide = ({ project }) => {
    return (
        <Section>
            <Section.LeftContainer sideOnTop={"left"}>
                <Image fluid={project.projectGraphics.fluid} alt={project.projectGraphics.title} />
            </Section.LeftContainer>

            <Section.RightContainer sideOnTop={"left"}>
                <Flex flexDirection="column" justifyContent="center">
                    <SubtleTitle>{project.motto}</SubtleTitle>
                    <Title>{project.projectName}</Title>
                    <Subtitle margin="24px 0">
                        {project.description.description}
                    </Subtitle>
                    <Button target="_blank" to={project.link}>
                        {project.buttonText}
                    </Button>
                </Flex>
            </Section.RightContainer>
        </Section>
    );
};

BenefitSlide.propTypes = {
    project: PropTypes.object
};

export default BenefitSlide;
