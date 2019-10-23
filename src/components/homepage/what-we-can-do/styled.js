import styled from "styled-components";

export const Subtitle = styled.div`
    color: var(--variant-black);
    font-size: ${props => props.theme.spacing.unit * 4}pt;
    text-align: center;
`;

export const Item = styled.div`
    text-align: left;
    padding: ${props => props.theme.spacing.unit * 2}px;
    @media (max-width: ${props => props.theme.breakpoints.sm}px) {
        text-align: center;
    }
`;

export const Title = styled.h3`
    font-size: ${props => props.theme.spacing.unit * 5}pt;
    font-weight: bold;
`;

export const Description = styled.div`
    font-size: ${props => props.theme.spacing.unit * 3}pt;
`;
