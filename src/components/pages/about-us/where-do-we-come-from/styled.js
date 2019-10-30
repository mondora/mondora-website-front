import styled from "styled-components";
import Subtitle from "../../../subtitle";

export const MarginTopSubtitle = styled(Subtitle)`
    margin-top: ${props => props.theme.spacing.unit * 8}px;
`;
