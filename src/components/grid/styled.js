import styled, { css } from "styled-components";

const getPercentageWidthFromRatio = ratio => {
    if (ratio === undefined || ratio === null) {
        return css`
            width: auto;
        `;
    }
    if (ratio === 0) {
        return css`
            display: none;
        `;
    }
    if (ratio > 12) {
        ratio = 12;
    }
    return css`
        width: ${(ratio / 12) * 100}%;
    `;
};

export const Container = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction};
    ${props =>
        props.wrap &&
        css`
            flex-wrap: wrap;
        `}
    align-items: ${({ align }) => align};
    justify-content: ${({ justify }) => justify};
    box-sizing: border-box;
    ${props => getPercentageWidthFromRatio(props.xs)}
    ${props =>
        props.item &&
        props.sm &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.sm}px) {
                ${getPercentageWidthFromRatio(props.sm)}
            }
        `}
    ${props =>
        props.item &&
        props.md &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.md}px) {
                ${getPercentageWidthFromRatio(props.md)}
            }
        `}
    ${props =>
        props.item &&
        props.lg &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.lg}px) {
                ${getPercentageWidthFromRatio(props.lg)}
            }
        `}
    ${props =>
        props.item &&
        props.xl &&
        css`
            @media (min-width: ${props => props.theme.breakpoints.xl}px) {
                ${getPercentageWidthFromRatio(props.xl)}
            }
        `}
`;

export const Spacer = styled.div`
    display: flex;
    box-sizing: border-box;
    ${props => {
        const { verticalRatio, horizontalRatio } = props;
        if (!verticalRatio && !horizontalRatio) {
            return;
        }
        const spacingUnit = props.theme.spacing.unit;
        const verticalSpacing = spacingUnit * verticalRatio;
        const horizontalSpacing = spacingUnit * horizontalRatio;
        return css`
            margin-top: ${verticalSpacing}px;
            margin-left: ${horizontalSpacing}px;
        `;
    }};
`;
