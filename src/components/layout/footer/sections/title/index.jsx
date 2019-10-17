import styled from "styled-components";

const Title = styled.span`
    font-weight: 700;
    font-size: ${props => props.theme.spacing.unit * 4}px;
    margin-bottom: ${props => props.theme.spacing.unit * 2}px;
    text-transform: uppercase;
`;

export default Title;
