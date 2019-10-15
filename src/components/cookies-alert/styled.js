import styled from "styled-components";

export const Container = styled.div`
    opacity: ${props => (props.show ? 1 : 0)};
    background: #fff;
    position: fixed;
    bottom: ${props => props.theme.spacing.unit * 2}px;
    right: ${props => props.theme.spacing.unit * 2}px;
    left: ${props => props.theme.spacing.unit * 2}px;
    padding: ${props => props.theme.spacing.unit * 2}px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transition: ${props =>
        props.show
            ? `opacity 0.3s ease`
            : `transform 0.3s ease 0.3s, opacity 0.3s ease`};
    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        width: 500px;
        bottom: ${props => props.theme.spacing.unit * 4}px;
        right: ${props => props.theme.spacing.unit * 4}px;
        left: ${props => props.theme.spacing.unit * 4}px;
    }
`;
