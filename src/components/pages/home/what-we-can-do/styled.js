import styled from "styled-components";

export const Item = styled.div`
    text-align: left;
    @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
        text-align: center;
        & > {
            padding: 0;
        }
    }
`;

export const Title = styled.h3`
    font-size: ${(props) => props.theme.spacing.unit * 5}pt;
    font-weight: bold;
`;

export const Description = styled.div`
    font-size: ${(props) => props.theme.spacing.unit * 3}pt;
`;
