import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MaxWidthContainer from "../max-width-container";

const Header = styled.header`
    background: var(--background-light-gray);
    text-align: center;
    width: 100%;
    padding: 1.75em 0;

    @media (min-width: ${props => props.theme.breakpoints[0]}px) {
        padding: 2.5em 0;
    }

    @media (min-width: ${props => props.theme.breakpoints[1]}px) {
        padding: 4em 0;
    }
`;

const HeaderInner = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before,
    &::after {
        content: "";
        width: 15%;
        height: 1px;
        background: var(--text-light-gray);
        visibility: hidden;

        @media (min-width: ${props => props.theme.breakpoints[0]}px) {
            visibility: visible;
        }
    }
`;

const Title = styled.h1`
    font-size: 2em;
    font-weight: 400;
    line-height: 1.2em;
    margin: 0 0 0;
    padding: 0 1em;

    @media (min-width: ${props => props.theme.breakpoints[1]}px) {
        font-size: 3em;
    }
`;

const PageTitle = ({ children }) => (
    <Header>
        <MaxWidthContainer>
            <HeaderInner>
                <Title>{children}</Title>
            </HeaderInner>
        </MaxWidthContainer>
    </Header>
);

PageTitle.propTypes = {
    children: PropTypes.node.isRequired
};

export default PageTitle;
