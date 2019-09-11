import React from "react";

import PropTypes from "prop-types";

import styled from "styled-components";

import Slider from "react-slick";

import BenefitSlide from "../benefit-slide";

import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Arrow = styled(FontAwesomeIcon)`
    margin: 40px;
    width: 40px;
    height: 40px;
    font-size: 200px;
    color: var(--text-dark-black);
    transition: 0.2s ease;
    :hover{
        color: var(--primary);
    }
    ::before {
        content: '';
    }
`;
const BenefitCarousel = ({ projects }) => {
    return (
        <Slider
            dots={true}
            swipeToSlide={true}
            arrovs={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            nextArrow={<Arrow icon={faAngleRight}/>}
            prevArrow={<Arrow icon={faAngleLeft}/>}
        >
            {projects.map(project => (
                <BenefitSlide project={project} />
            ))}
        </Slider>
    );
};

BenefitCarousel.propTypes = {
    projects: PropTypes.object
};

export default BenefitCarousel;
