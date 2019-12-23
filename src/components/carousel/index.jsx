import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import Slider from "react-slick";

import FeatherIcon from "../feather-icon";

const CarouselContainer = styled.div`
    max-width: 1200px;
    margin: auto;
    padding: 0 48px;
`;

const ArrowContainer = styled.div`
    color: var(--text-dark-black);
    transition: 0.3s ease;
    &:hover {
        color: var(--primary);
    }
    &::before {
        content: "";
    }
`;

const Carousel = ({ children, ...rest }) => {
    const settings = {
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4
    };

    return (
        <CarouselContainer>
            <Slider
                {...settings}
                {...rest}
                nextArrow={
                    <ArrowContainer>
                        <FeatherIcon size={24} name="chevron-right" />
                    </ArrowContainer>
                }
                prevArrow={
                    <ArrowContainer>
                        <FeatherIcon size={24} name="chevron-left" />
                    </ArrowContainer>
                }
            >
                {children}
            </Slider>
        </CarouselContainer>
    );
};

Carousel.propTypes = {
    children: PropTypes.node
};

export default Carousel;
