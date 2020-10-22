import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Header = styled.header`
    width: 100%;
    text-align: center;
    margin: 30px 0 60px;
    padding: 0 0 40px;
    position: relative;

    &:before {
        content: "";
        display: block;
        position: absolute;
        bottom: 6px;
        left: 50%;
        width: 240px;
        height: 2px;
        margin-left: -120px;
        background-color: var(--text-dark-black);
    }

    &:after {
        content: "";
        display: block;
        position: absolute;
        bottom: -1px;
        left: 50%;
        width: 12px;
        height: 12px;
        margin-left: -6px;
        background-color: var(--white);
        border: 2px solid var(--text-dark-black);
        border-radius: 50%;
    }
`;

const H1 = styled.h1`
    margin: 0;
    font-size: 3.5em;
`;

const PageTitle = ({ children }) => (
    <Header>
        <H1>{children}</H1>
    </Header>
);

PageTitle.propTypes = {
    children: PropTypes.node.isRequired
};

export default PageTitle;
