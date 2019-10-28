import styled from "styled-components";
import Image from "gatsby-image";

export const FullWidthImage = styled(Image)`
    width: 100%;
`;

export const MarginFullWidthImage = styled(FullWidthImage)`
    margin: ${props => props.theme.spacing.unit * 4}px 0;
`;
