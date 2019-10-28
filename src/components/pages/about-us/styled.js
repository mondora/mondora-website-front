import styled from "styled-components";
import BackgroundDecoratedGrid from "../../background-decorated-grid";
import FullWidthImage from "../../full-width-image";

export const PaddedBackgroundDecoratedGrid = styled(BackgroundDecoratedGrid)`
    padding-top: ${props => props.theme.spacing.unit * 14}px;
    padding-bottom: ${props => props.theme.spacing.unit * 14}px;
`;

export const MarginFullWidthImage = styled(FullWidthImage)`
    margin: ${props => props.theme.spacing.unit * 4}px 0;
`;
