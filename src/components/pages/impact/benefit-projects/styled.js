import styled from "styled-components";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Arrow = styled(FontAwesomeIcon)`
    width: ${props => props.theme.spacing.unit * 12}px;
    height: ${props => props.theme.spacing.unit * 12}px;
    font-size: ${props => props.theme.spacing.unit * 12}px;
    color: #000;
    transition: color 0.2s ease;
    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        margin-right: ${props => props.theme.spacing.unit * 4}px;
        margin-left: ${props => props.theme.spacing.unit * 4}px;
    }
    :hover {
        color: var(--primary);
    }
`;

export const CustomSlider = styled(Slider)`
    width: 80vw;
    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        width: 90vw;
    }
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
