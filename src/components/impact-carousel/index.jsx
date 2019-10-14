import React from "react";

import { Link } from "gatsby";
import styled from "styled-components";

import Slider from "react-slick";
import useWindowSize from "@rehooks/window-size";

import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MaxWidthContainer from "../max-width-container";

const Arrow = styled(FontAwesomeIcon)`
    height: 40px;
    font-size: 200px;
    z-index: 3;
    color: var(--text-dark-black);
    transition: 0.1s ease;
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

const FeedWrapper = styled(MaxWidthContainer)`
    height: fit-content;
    padding: 30pt 0;
    width: 80vw;
`;

const Report = styled.div`
    max-width: 300pt;
    display: grid;
    position: relative;
    min-height: 128px;
    margin: 20px auto;
    box-shadow: 0 0 10px gray;
    background-color: var(--white);

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const ReportImage = styled.div`
    margin: auto;
    grid-area: 1 / 1 / 3 / 1;
    @media (max-width: 768px) {
        grid-area: 2 / 1 / 2 / 1;
    }
`;

const ReportIcon = styled.img`
    width: 120px;
    padding: 16px;

    @media (max-width: 768px) {
        padding: 0 0 13pt 0;
    }
`;
const ReportYear = styled.div`
    position: absolute;
    top: 42px;
    left: 70px;
    transform: rotate(-4deg);
    font-weight: bold;
    font-size: 24px;
    color: var(--primary);
    width: 120px;
    margin: 16px auto;

    @media (max-width: 768px) {
        left: 110px;
        top: 74px;
    }
`;
const ReportTitle = styled.h1`
    font-size: 20px;
    margin: 16px 0;
    grid-area: 1 / 2 / 2 / 2;

    @media (max-width: 768px) {
        grid-area: 1 / 1 / 1 / 1;
        margin: 13pt 0 0 0;
    }
`;

const ReportButton = styled.div`
    grid-area: 2 / 2 / 2 / 2;

    @media (max-width: 768px) {
        grid-area: 3 / 1 / 3 / 1;
        padding-bottom: 13pt;
    }
`;

const ReportLink = styled(Link)`
    font-size: 11pt;
    text-decoration: none;
    color: var(--variant-black);
    border: 1px solid var(--border-gray);
    padding: 8px;
`;

const ImpactCarousel = ({ reports = [] }) => {
    let windowSize = 900;
    if (typeof window !== "undefined") {
        windowSize = useWindowSize();
    }
    var slidesNumber = 3;
    if (windowSize.innerWidth < 992) slidesNumber = 2;
    if (windowSize.innerWidth < 768) slidesNumber = 1;
    return (
        <FeedWrapper>
            <CustomSlider
                slidesToShow={slidesNumber}
                slidesToScroll={1}
                infinite={true}
                dots={true}
                swipeToSlide={true}
                speed={500}
                nextArrow={<Arrow icon={faAngleRight} />}
                prevArrow={<Arrow icon={faAngleLeft} />}
            >
                {reports.map((report, i) => (
                    <div>
                        <Report key={i}>
                            <ReportImage>
                                <ReportIcon src={report.icon} />
                                <ReportYear>{report.year}</ReportYear>
                            </ReportImage>
                            <ReportTitle>{report.title}</ReportTitle>
                            <ReportButton>
                                <ReportLink to={report.to}>
                                    {report.button}
                                </ReportLink>
                            </ReportButton>
                        </Report>
                    </div>
                ))}
            </CustomSlider>
        </FeedWrapper>
    );
};

export default ImpactCarousel;
