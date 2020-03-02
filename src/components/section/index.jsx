import React from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

const SectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-column-gap: ${props => props.gutter}px;

    margin: auto;

    @media (max-width: 768px) {
        text-align: center;
        grid-template-columns: 1fr;
    }

    ${props =>
        props.header &&
        css`
            min-height: 448px;
        `}
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */

    align-self: stretch;
    justify-self: stretch;

    padding-right: ${props => props.padding}px;
    padding-left: ${props => props.padding}px;
`;

const LeftContainer = styled(Container)`
    grid-area: 1 / 1 / 2 / 2;
    margin: 32px 0;

    @media (max-width: 768px) {
        grid-area: ${props =>
            props.sideOnTop === "left" ? "1 / 1 / 2 / 2" : "4 / 1 / 4 / 2"};
    }
`;

const RightContainer = styled(Container)`
    grid-area: 1 / 3 / 2 / 4;
    margin: 32px 0;

    @media (max-width: 768px) {
        margin: 0;
        grid-area: ${props =>
            props.sideOnTop === "left" ? "3 / 1 / 4 / 2" : "1 / 1 / 2 / 2"};
    }
`;

const DividerContainer = styled.div`
    grid-area: 1 / 2 / 2 / 3;

    @media (max-width: 768px) {
        grid-area: ${props =>
            props.sideOnTop === "left" ? "6 / 1 / 2 / 2" : "1 / 1 / 1 / 2"};
    }
`;

const Section = ({ children, margin = 0, gutter = 0, header }) => {
    return (
        <SectionContainer gutter={gutter} margin={margin} header={header}>
            {children}
        </SectionContainer>
    );
};

Section.RightContainer = RightContainer;
Section.LeftContainer = LeftContainer;
Section.DividerContainer = DividerContainer;

Section.propTypes = {
    children: PropTypes.array,
    gutter: PropTypes.number,
    margin: PropTypes.string,
    header: PropTypes.bool,
    sideOnTop: PropTypes.string
};

Section.defaultProps = {
    sideOnTop: "right"
};

Section.defaultProps = {
    gutter: 32
};

export default Section;
