import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const SectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-column-gap: ${props => props.gutter}px;

    margin: auto;

    @media (max-width: 768px) {
        text-align: center;
        grid-template-columns: initial;
    }
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

    @media (max-width: 768px) {
        grid-area: 1 / 1 / 2 / 2;
    }
`;

const RightContainer = styled(Container)`
    grid-area: 1 / 3 / 2 / 4;

    @media (max-width: 768px) {
        ${props =>
            props.middleDivider
                ? "grid-area: 3 / 1 / 4 / 2"
                : "grid-area: 3 / 1 / 4 / 2"}
    }
`;

const DividerContainer = styled.div`
    grid-area: 1 / 2 / 2 / 3;

    @media (max-width: 768px) {
        ${props =>
            props.middleDivider
                ? "grid-area: 2 / 1 / 3 / 2"
                : "grid-area: 3 / 1 / 4 / 2"}
    }
`;

const Section = ({ children, margin = 0, gutter = 0 }) => {
    return (
        <SectionContainer gutter={gutter} margin={margin}>
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
    margin: PropTypes.string
};

export default Section;
