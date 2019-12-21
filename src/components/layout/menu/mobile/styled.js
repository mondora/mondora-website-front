import styled from "styled-components";

import { Link } from "gatsby";
import { theme } from "../../../../styles/theme";

const toolbarHeight = theme.spacing.unit * 18;

export const ToolbarGrid = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--background-dark-gray);
    height: ${toolbarHeight}px;
    padding: 0 ${props => props.theme.spacing.unit * 4}px;
    z-index: 24;
    border-bottom: 2px solid #fff;
`;

export const MenuItem = styled.div`
    height: ${props => props.theme.spacing.unit * 12}px;
    text-decoration: none;
    border-bottom: 1px solid var(--border-dark-gray);
    padding: 0 ${props => props.theme.spacing.unit * 4}px;
    box-sizing: border-box;
`;

export const AnimatedMenu = styled.div`
    z-index: 20;
    padding-top: ${toolbarHeight}px;
    background: var(--background-dark-gray);
    position: fixed;
    right: 0;
    left: 0;
    top: ${props => (props.open ? "0" : "-100%")};
    transition: top 0.3s ease-in-out;
`;

export const MenuLink = styled(Link)`
    text-decoration: none;
    color: var(--white);
`;

export const BlogLink = styled.div`
    text-decoration: none;
    color: var(--white);
`;

export const Spacer = styled.div`
    height: ${toolbarHeight}px;
`;
