import styled from "styled-components";
import FullWidthImage from "../../../full-width-image";

export const MarginFullWidthImage = styled(FullWidthImage)`
    margin: ${(props) => props.theme.spacing.unit * 4}px 0;
`;
