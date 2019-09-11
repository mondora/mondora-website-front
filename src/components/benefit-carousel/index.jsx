import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import Slider from "react-slick";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BenefitSlide from "../benefit-slide";

const Arrow = styled(FontAwesomeIcon)`
    margin: 40px;
    width: 40px;
    height: 40px;
    font-size: 200px;
    z-index: 3;
    color: var(--text-dark-black);
    transition: 0.2s ease;
    :hover {
        color: var(--primary);
    }
    ::before {
        content: "";
    }
`;

const CustomSlider = styled(Slider)`
    .slick-dots li.slick-active button:before {
        color: var(--primary);
        font-size: 16px;
        opacity: 1;
    }
    .slick-dots li button:before {
        color: var(--gray);
        font-size: 16px;
        opacity: 1;
    }
`;

const BenefitCarousel = ({ projects }) => {
    return (
        <CustomSlider
            dots={true}
            swipeToSlide={true}
            speed={500}
            nextArrow={<Arrow icon={faAngleRight} />}
            prevArrow={<Arrow icon={faAngleLeft} />}
        >
            {projects.map(project => (
                <BenefitSlide project={project} />
            ))}
        </CustomSlider>
    );
};

BenefitCarousel.propTypes = {
    projects: PropTypes.object
};

export default BenefitCarousel;
