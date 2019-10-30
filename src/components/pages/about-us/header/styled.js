import styled from "styled-components";
import Title from "../../../title";
import Grid from "../../../grid";

export const MarginGrid = styled(Grid)`
    margin-top: ${props => props.theme.spacing.unit * 4}px;
    margin-bottom: ${props => props.theme.spacing.unit * 4};px
`;

export const ImpactfulTitle = styled(Title)`
    font-size: ${props => props.theme.spacing.unit * 22}pt;
    line-height: ${props => props.theme.spacing.unit * 24}pt;
    @media (max-width: ${props =>
            props.theme.breakpoints.md}px) and (min-width: ${props =>
            props.theme.breakpoints.sm}px) {
        font-size: ${props => props.theme.spacing.unit * 18}pt;
        line-height: ${props => props.theme.spacing.unit * 20}pt;
    }
`;

export const TextCenterAlignedGrid = styled(Grid)`
    text-align: center;
`;
