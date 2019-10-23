import styled from "styled-components";
import Grid from "../../grid";
import LightBackground from "../../layout/assets/light_background.svg";

export const Container = styled(Grid)`
    background-image: url(${LightBackground});
    padding: ${props => props.theme.spacing.unit * 6}px;
`;

export const UndecoratedLink = styled.a`
    text-decoration: none;
`;
