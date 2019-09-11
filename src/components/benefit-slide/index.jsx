import React from "react";
import PropTypes from "prop-types";
import SquareButton from "../square-button";

import styled from "styled-components";

const ProjectWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 24px;
`;
const Image = styled.img`
    width: 100%;
`;
const Caption = styled.div`
    margin: 64px 0 24px 0;
    text-transform: uppercase;
    color: var(--text-light-gray);
    font-size: 12pt;
`;
const Description = styled.div`
    color: var(--text-gray);
    width: 90%;
    margin: 24px auto 24px 0;
    line-height: 1.6;
`;

const BenefitSlide = ({ project }) => {
    return (
        <ProjectWrapper>
        <Image src={project.graphic}/>

        <div>
            <Caption>{project.caption}</Caption>
            <h1>{project.title}</h1>
            <Description>{project.text}</Description>
            <SquareButton>{project.button}</SquareButton>
        </div>
        </ProjectWrapper>
    );
};

BenefitSlide.propTypes = {
    project: PropTypes.object
};

export default BenefitSlide;
