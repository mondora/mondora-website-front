import styled from "styled-components";
import Grid from "../../../grid";
import DarkBackground from "../../../layout/assets/dark_background.svg";

export const AboutSection = styled(Grid)`
    background-image: url(${DarkBackground});
    background-position: center;
    background-size: cover;
    padding-top: ${props => props.theme.spacing.unit * 8}px;
    padding-bottom: ${props => props.theme.spacing.unit * 8}px;
    @media (max-width: 768px) {
        text-align: left;
    }
`;
