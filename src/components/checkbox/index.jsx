import React from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import FeatherIcon from "../feather-icon";

const Container = styled.div`
    margin: 4px 64px;
    display: flex;
    align-items: center;
    color: var(--text-dark-black);
    transition: 0.1s ease;
    font-weight: ${props => (props.checked ? "600" : "400")};

    ${props =>
        props.appearance === "mobile"
            ? css`
                  background-color: var(--background-light-gray);
                  margin: 8px 0;
                  border-radius: 4px;
                  padding: 8px;
                  width: 240px;
                  display: flex;
                  flex-direction: row-reverse;
                  justify-content: space-between;
                  align-items: center;
              `
            : css`
                  margin: 4px 0;
              `}
    @media (min-width: 692px) {
        &:hover .checkmark {
            background-color: var(--text-dark-gray);
        }
    }
`;

const CheckMark = styled.div`
    margin-right: 8px;
    border: 1px solid var(--text-dark-black);
    padding: 1px;
    font-weight: bold;
    ${props =>
        props.appearance === "mobile"
            ? css`
                  height: 20px;
                  width: 20px;
                  border-radius: 4px;
              `
            : css`
                  height: 13px;
                  width: 13px;
                  border-radius: 2px;
              `}
    background-color: ${props => props.checked && "var(--text-dark-black);"};
    ${props =>
        props.checked
            ? css`
                  background-color: var(--text-dark-black);
                  color: var(--white);
              `
            : css`
                  background-color: transparent;
                  color: transparent;
              `}
`;

const CheckBox = ({ appearance, label, checked }) => (
    <Container appearance={appearance} checked={checked}>
        <CheckMark
            className="checkmark"
            checked={checked}
            appearance={appearance}
        >
            <FeatherIcon size={"100%"} name={"check"} />
        </CheckMark>
        <label htmlFor={label}>{label}</label>
    </Container>
);

CheckBox.propTypes = {
    label: PropTypes.string,
    appearance: PropTypes.oneOf(["mobile", "desktop", null]),
    checked: PropTypes.bool
};

export default CheckBox;
