import styled, { css } from "styled-components";
import Grid from "../../../../grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RootGrid = styled(Grid)`
    width: 100%;
`;

export const QuestionGrid = styled(Grid)`
    padding: ${props => props.theme.spacing.unit * 4}px;
    background: rgb(245, 246, 246);
    color: #000;
    cursor: pointer;
    transition: background 0.3s ease;
    ${props =>
        props.open &&
        css`
            background: rgb(255, 222, 3);
        `}
`;

export const Icon = styled(FontAwesomeIcon)`
    color: #000;
    transform: rotate(${props => (props.open ? "180deg" : "0deg")});
    transition: transform 0.3s ease;
`;

export const Answer = styled(Grid)`
    color: #000;
    visibility: hidden;
    max-width: 100%;
    height: 0;
    padding: 0;
    ${props =>
        props.open &&
        css`
            padding: ${props => props.theme.spacing.unit * 4}px;
            visibility: visible;
            height: auto;
        `}
`;
