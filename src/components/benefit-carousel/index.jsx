import React from "react";

import PropTypes from "prop-types";

import styled from "styled-components";

import Slider from "react-slick";

import BenefitSlide from "../benefit-slide";

const BenefitCarousel = ({ projects }) => {
    return (
        <Slider
            dots={true}
            swipeToSlide={true}
            arrovs={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
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
