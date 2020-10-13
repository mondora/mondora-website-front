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
    margin: 8px;
    height: 400px;
`;

const PersonSlide = ({ person }) => {
    return (
        <PersonContainer>
            {person.picture && (
                <Image
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
