import React from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import Slider from "react-slick";

import FeatherIcon from "../feather-icon";

const CarouselContainer = styled.div`
    ${props =>
        !props.fullWidth &&
        css`
            max-width: 1200px;
            margin: auto;
            padding: 0 48px;
        `}
`;

const ArrowContainer = styled.div`
    width: auto;
    color: var(--text-dark-black);
    transition: 0.3s ease;
    &:hover {
        color: var(--primary);
    }
    &::before {
        content: "";
    }
`;

const CustomSlider = styled(Slider)`
    display: block;
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

const Carousel = ({ children, fullWidth, ...rest }) => {
    const settings = {
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4
    };

    return (
        <CarouselContainer fullWidth={fullWidth}>
            <CustomSlider
                {...settings}
                {...rest}
                nextArrow={
                    <ArrowContainer>
                        <FeatherIcon size={32} name="chevron-right" />
                    </ArrowContainer>
                }
                prevArrow={
                    <ArrowContainer>
                        <FeatherIcon size={32} name="chevron-left" />
                    </ArrowContainer>
                }
            >
                {children}
            </CustomSlider>
        </CarouselContainer>
    );
};

Carousel.propTypes = {
    children: PropTypes.node,
    fullWidth: PropTypes.bool
};

export default Carousel;
