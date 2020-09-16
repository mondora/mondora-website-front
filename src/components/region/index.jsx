import React from "react";
import PropTypes from "prop-types";

import { Link } from "gatsby";

import styled from "styled-components";
import Image from "gatsby-image";

import SquareButton from "../square-button";

import Underline from "../../images/separator.svg";

const RegionContainer = styled.div`
    background-color: white;
    margin: 20px;
    height: fit-content;
`;
const RegionNumber = styled.div`
    font-size: ${props => props.theme.size.text.megaM};
    font-weight: bold;
    width: 100%;
`;
const DividerSwirl = styled.img`
    width: 40%;
    margin: auto;
`;
const RegionName = styled.div`
    margin: 16px auto;
`;

const RegionMiniature = ({ image, people, name, button }) => (
    <RegionContainer>
        {image && <Image fluid={image.fluid} alt={image.title} />}
        <RegionNumber>{people ? people.length : "0"}</RegionNumber>
        <DividerSwirl src={Underline} />
        <RegionName>{name}</RegionName>
        {button && (
            <Link to={button.link}>
                <SquareButton theme="light">{button.text}</SquareButton>
            </Link>
        )}
    </RegionContainer>
);
RegionMiniature.propTypes = {
    image: PropTypes.object,
    people: PropTypes.array,
    name: PropTypes.string,
    button: PropTypes.object,
    region: PropTypes.string
};
export default RegionMiniature;
