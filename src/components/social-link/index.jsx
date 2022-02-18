import React from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import Link from "../link";
import FeatherIcon from "../feather-icon";

const SocialContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    cursor: pointer;
    padding: 6px;
    text-decoration: none;

    border: 2px solid;
    border-radius: 40px;

    transition: all ease 0.4s;

    ${props =>
        props.theme === lightTheme
            ? css`
                  color: var(--black);
                  background: var(--white);
                  border-color: var(--white);
                  &:hover {
                      color: var(--white);
                      border-color: var(--dark);
                      background: var(--dark);
                  }
              `
            : css`
                  color: var(--white);
                  background: var(--background-dark-gray);
                  border-color: var(--background-dark-gray);
                  &:hover {
                      color: var(--background-dark-gray);
                      border-color: var(--background-dark-gray);
                      background: var(--white);
                  }
              `}
`;

const SocialText = styled.span`
    margin: 0 4px;
`;

export const SocialLink = props => (
    <SocialContainer
        {...props}
        as={props.link ? Link : "button"}
        to={props.link}
        role="img"
        target={props.newTab && "_blank"}
        aria-label={props.icon}
    >
        {props.icon && (
            <FeatherIcon name={props.icon} size={props.size || 18} />
        )}
        {props.image && (
            <img
                height={props.size}
                src={props.image.file.url}
                alt={props.image.title}
            />
        )}
        {props.text && <SocialText {...props}>{props.text}</SocialText>}
    </SocialContainer>
);

const lightTheme = "light";
const darkTheme = "dark";

SocialLink.propTypes = {
    icon: PropTypes.string,
    image: PropTypes.object,
    text: PropTypes.string,
    link: PropTypes.string,
    size: PropTypes.number,
    newTab: PropTypes.bool,
    theme: PropTypes.PropTypes.oneOf([lightTheme, darkTheme])
};

SocialLink.defaultProps = {
    theme: lightTheme,
    newTab: true
};

export default SocialLink;
