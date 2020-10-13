import React from "react";
import PropTypes from "prop-types";

import Image from "gatsby-image";
import styled from "styled-components";

import ParagraphTitle from "../paragraph-title";
import SubtleTitle from "../subtle-title";
import Subtitle from "../subtitle";
import Swirl from "../swirl";

const PersonContainer = styled.div`
    text-align: center;
    background-color: white;
    margin: 20px;
    height: fit-content;
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
