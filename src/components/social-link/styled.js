import styled, { css } from "styled-components";
import Grid from "../Grid";

export const RadiusIcon = styled(Grid)`
    ${props => {
        const type = props.type;
        const spacingUnit = props.theme.spacing.unit;
        return css`
            font-size: ${spacingUnit * 4}px;
            border-radius: ${spacingUnit * 4}px;
            padding: ${spacingUnit * 2}px;
            color: ${type === "dark" ? `var(--white)` : `var(--black)`};
            background: ${type === "dark" ? `var(--black)` : `var(--white)`};
        `;
    }}
`;

export const SocialName = styled.div`
    font-size: ${props => props.theme.spacing.unit * 3}px;
`;

export const LinkContainer = styled.a`
    cursor: pointer;
    text-decoration: none;
`;
