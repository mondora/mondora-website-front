import React from "react";
import PropTypes from "prop-types";

import Image from "gatsby-image";
import styled from "styled-components";

import ParagraphTitle from "../paragraph-title";
import SubtleTitle from "../subtle-title";
import Subtitle from "../subtitle";
import Swirl from "../swirl";

const PersonContainer = styled.div`
    box-shadow: 0 4px 14px 0 var(--border-gray);
    text-align: center;
    background-color: white;
    margin: 24px 12px;
    min-width: 192px;
    max-width: 240px;
    height: 360px;
    @media (max-width: ${props => props.theme.breakpoints[1]}px) {
        margin: 0 auto;
    }
`;

const ProfilePicture = styled(Image)`
    height: 120px;
    width: 120px;
    border-radius: 120px;
    object-fit: cover;
    margin: 24px;
`;

const PersonSlide = ({ person }) => {
    return (
        <PersonContainer>
            {person.picture && (
                <ProfilePicture
                    fixed={person.picture.fixed}
                    alt={person.picture.title}
                />
            )}
            <Swirl margin={"auto"} />
            <ParagraphTitle center={[1, 1]}>{person.name}</ParagraphTitle>
            <SubtleTitle>{person.role}</SubtleTitle>
            <Subtitle>
                {person.description && person.description.description}
            </Subtitle>
        </PersonContainer>
    );
};

PersonSlide.propTypes = {
    person: PropTypes.object
};

export default PersonSlide;
