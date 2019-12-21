import React from "react";
import PropTypes from "prop-types";

import BenefitSlide from "../benefit-slide";

import Carousel from "../carousel";

const BenefitCarousel = ({ projects }) => {
    return (
        <Carousel slidesToScroll={1} slidesToShow={1}>
            {projects.map((project, i) => (
                <BenefitSlide key={i} project={project} />
            ))}
        </Carousel>
    );
};

BenefitCarousel.propTypes = {
    projects: PropTypes.array
};

export default BenefitCarousel;
