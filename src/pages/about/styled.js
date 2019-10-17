import styled from "styled-components";

import DarkBackground from "../../components/layout/assets/dark_background.svg";
import LightBackground from "../../components/layout/assets/light_background.svg";

export const LeftParagraph = styled.div`
    display: ${props => !props.hideOnMobile && "none"};
    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        text-align: center;
        display: ${props => (props.hideOnMobile ? "none" : "initial")};
    }
`;

export const LeftTitle = styled.h1`
    font-size: 34pt;
`;

export const LeftContent = styled.div`
    color: var(--text-gray);
`;

export const RightTitle = styled.h1`
    font-size: 100pt;
    text-align: center;
    display: ${props => !props.hideOnMobile && "none"};

    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        font-size: 70pt;
        display: ${props => (props.hideOnMobile ? "none" : "initial")};
    }

    @media (max-width: ${props => props.theme.breakpoints.xs}px) {
        font-size: 60pt;
    }
`;

export const AboutSection = styled.div`
    div,
    h1 {
        color: ${props => (props.color === "light" ? "" : "white")};
    }
    color: ${props => (props.color === "light" ? "" : "white")};
    margin-top: ${props => props.marginTop && "110pt"};
    padding-top: ${props => props.theme.spacing.unit * 16}px;
    padding-bottom: ${props => props.theme.spacing.unit * 20}px;
    padding-right: ${props => props.theme.spacing.unit * 4}px;
    padding-left: ${props => props.theme.spacing.unit * 4}px;
    background-position: center;
    background-size: cover;
    background-image: ${props =>
        props.color === "light"
            ? `url(${LightBackground})`
            : `url(${DarkBackground})`};

    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        margin-top: ${props => props.marginTop && "50pt"};
    }

    > * {
        max-width: 1440px;
        margin: 0 auto;
    }
`;
export const AboutWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;

    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        grid-template-columns: 100%;
    }
`;

export const TitleAndDescription = styled.div`
    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        grid-area: 2 / 1 / 3 / 1;
    }
`;

export const AboutTitle = styled.div`
    padding-top: ${props => props.theme.spacing.unit * 4}px;
    font-size: 12pt;
    color: ${props =>
        props.color === "light" ? "var(--text-gray)" : "var(--white)"};
`;

export const AboutParagraph = styled.div`
    color: var(--text-gray);
    line-height: 1.5;
`;
export const AboutDivider = styled.img`
    width: 25%;
    margin-top: ${props => props.theme.spacing.unit * 7}px;
    min-width: 120pt;

    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        display: none;
    }
`;

export const AboutImage = styled.img`
    width: 100%;

    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        grid-area: 1 / 1 / 2 / 1;
    }
`;
export const AboutConclusion = styled.div`
    padding-top: ${props => props.theme.spacing.unit * 10}px;
    margin: ${props => props.theme.spacing.unit * 10}px 10%;
    text-align: center;

    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        margin: 0;
    }
`;
