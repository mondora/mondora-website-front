import React from "react";
import PropTypes from "prop-types";

import { Link } from "gatsby";

import styled from "styled-components";

import Underline from "../../../static/images/separator.svg";

const RegionContainer = styled.div`
    background-color: white;
    margin: 20px;
    height: fit-content;
`;
const RegionImage = styled.img`
    width: 100%;
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
const SuperLink = styled(Link)`
    display: block;
    border: 1pt solid var(--border-gray);
    padding: 8px;
    margin: 16px auto;
    width: fit-content;
    color: var(--variant-black);
    text-decoration: none;
`;

const RegionMiniature = ({ image, number, name, link, button }) => (
    <RegionContainer>
        <RegionImage src={image} />
        <RegionNumber>{number}</RegionNumber>
        <DividerSwirl src={Underline} />
        <RegionName>{name}</RegionName>
        <SuperLink to={link}>{button}</SuperLink>
    </RegionContainer>
);
RegionMiniature.propTypes = {
    image: PropTypes.string,
    number: PropTypes.string,
    name: PropTypes.string,
    link: PropTypes.string,
    button: PropTypes.string,
    region: PropTypes.string
};
export default RegionMiniature;
