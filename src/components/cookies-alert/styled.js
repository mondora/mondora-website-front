import styled from "styled-components";

export const Container = styled.div`
    opacity: ${props => (props.show ? 1 : 0)};
    background: #fff;
    position: fixed;
    bottom: ${props => (props.show ? props.theme.spacing.unit * 4 : -1000)}px;
    right: ${props => props.theme.spacing.unit * 4}px;
    left: ${props => props.theme.spacing.unit * 4}px;
    padding: ${props => props.theme.spacing.unit * 4}px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transition: opacity 0.3s ease;
    @media (min-width: ${props => props.theme.breakpoints.md}px) {
        width: 500px;
        bottom: ${props =>
            props.show ? props.theme.spacing.unit * 8 : -1000}px;
        right: ${props => props.theme.spacing.unit * 8}px;
        left: ${props => props.theme.spacing.unit * 8}px;
    }
`;
