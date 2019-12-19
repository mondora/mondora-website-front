import React from "react";

import styled from "styled-components";

import Slider from "react-slick";

const CarouselContainer = styled.div`
    max-width: 1200px;
    margin: auto;
    padding: 0 48px;
`;

const Carousel = ({ children }) => {
    const settings = {
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <CarouselContainer>
            <Slider {...settings}> {children}</Slider>
        </CarouselContainer>
    );
};

export default Carousel;
