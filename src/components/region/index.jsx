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

const RegionMiniature = ({ data }) => (
    <RegionContainer>
        {data.graphic && (
            <Image fluid={data.graphic.fluid} alt={data.graphic.title} />
        )}
        <RegionNumber>{data.people ? data.people.length : "0"}</RegionNumber>
        <DividerSwirl src={Underline} />
        <RegionName>{data.name}</RegionName>
        {data.buttonText && (
            <Link to={`regions/ ${data.slug}`}>
                <SquareButton theme="light">{data.buttonText}</SquareButton>
            </Link>
        )}
    </RegionContainer>
);
RegionMiniature.propTypes = {
    data: PropTypes.object
};
export default RegionMiniature;
