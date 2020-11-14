import styled from "styled-components";
import BackgroundDecoratedGrid from "../../../background-decorated-grid";

export const Container = styled(BackgroundDecoratedGrid)`
    padding: ${props => props.theme.spacing.unit * 6}px;
`;

export const UndecoratedLink = styled.a`
    text-decoration: none;
`;
