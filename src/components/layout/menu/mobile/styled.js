import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import { Link } from "gatsby";
import Image from "gatsby-image";

const toolbarHeight = 74;

export const ToolbarGrid = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    background: var(--background-dark-gray);
    height: ${toolbarHeight}px;
    padding: 0 ${props => props.theme.spacing.unit * 4}px;
    z-index: 24;
    border-bottom: 2px solid #fff;
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
    text-transform: uppercase;
`;

export const BlogLink = styled.a`
    text-decoration: none;
    color: var(--white);
    text-transform: uppercase;
`;

export const InlineLogo = styled(Image)`
    margin-left: 4px;
`;

export const Spacer = styled.div`
    height: ${toolbarHeight}px;
`;

export const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${props => props.theme.spacing.unit * 12}px;
    text-decoration: none;
    border-bottom: 1px solid var(--border-dark-gray);
    padding: 0 ${props => props.theme.spacing.unit * 4}px;
    box-sizing: border-box;
    ${props =>
        props.background === lightTheme &&
        css`
            background: rgba(255, 255, 255, 0.1);
        `};
`;

const lightTheme = "light";
const darkTheme = "dark";

MenuItem.propTypes = {
    theme: PropTypes.oneOf([lightTheme, darkTheme])
};
