import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const SectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-column-gap: ${props => props.gutter}px;
    max-width: 1440px;

    margin-right: ${props =>
        props.margin === "auto" ? props.margin : props.margin + "px"};
    margin-left: ${props =>
        props.margin === "auto" ? props.margin : props.margin + "px"};

    @media (max-width: 768px) {
        text-align: center;
        grid-template-columns: initial;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    align-self: stretch;
    justify-self: stretch;

    padding-right: ${props => props.padding}px;
    padding-left: ${props => props.padding}px;
`;

const LeftContainer = styled(Container)`
    grid-area: 1 / 1 / 3 / 2;

    @media (max-width: 768px) {
        grid-area: 1 / 1 / 2 / 2;
    }
`;

const RightContainer = styled(Container)`
    grid-area: 1 / 3 / 3 / 4;

    @media (max-width: 768px) {
        grid-area: 2 / 1 / 3 / 2;
    }
`;

const DividerContainer = styled.div`
    grid-area: 1 / 2 / 2 / 3;

    @media (max-width: 768px) {
        grid-area: 3 / 1 / 4 / 2;
    }
`;

const Section = ({ children, position, margin = 0, gutter = 0 }) => {
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
    children: PropTypes.object,
    gutter: PropTypes.number,
    position: PropTypes.string,
    margin: PropTypes.string
};

export default Section;
