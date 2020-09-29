import React from "react";
import PropTypes from "prop-types";

import Image from "gatsby-image";
import styled from "styled-components";

import ParagraphTitle from "../paragraph-title";
import SubtleTitle from "../subtle-title";
import Subtitle from "../subtitle";

import Underline from "../../images/separator.svg";

const PersonContainer = styled.div`
    text-align: center;
    background-color: white;
    margin: 20px;
    height: fit-content;
`;
const DividerSwirl = styled.img`
    width: 40%;
    margin: auto;
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
            <DividerSwirl src={Underline} />
            <ParagraphTitle center={"center"}>{person.name}</ParagraphTitle>
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
