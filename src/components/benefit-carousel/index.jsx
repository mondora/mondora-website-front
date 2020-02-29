import React from "react";
import PropTypes from "prop-types";

import BenefitSlide from "../benefit-slide";

import Carousel from "../carousel";
import { Box } from "reflexbox";

const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
};

const BenefitCarousel = ({ projects }) => {
    return (
        <Box mb={48}>
            <Carousel {...settings}>
                {projects.map((project, i) => (
                    <BenefitSlide key={i} project={project} />
                ))}
            </Carousel>
        </Box>
    );
};

BenefitCarousel.propTypes = {
    projects: PropTypes.array
};

export default BenefitCarousel;
