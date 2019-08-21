import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const SectionContainer = styled.div`
    min-height: 512px;

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-column-gap: ${props => props.gutter}px;

    margin-right: ${props => props.margin}px;
    margin-left: ${props => props.margin}px;
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
    grid-area: 1 / 1 / 2 / 2;
    /* background: bisque; */
`;

const RightContainer = styled(Container)`
    grid-area: 1 / 3 / 2 / 4;
    /* background: teal; */
`;

const DividerContainer = styled.div`
    grid-area: 1 / 2 / 2 / 3;
`;

const Section = ({ children, position, margin = 128, gutter = 0 }) => {
    return <SectionContainer gutter={gutter} margin={margin}>{children}</SectionContainer>;
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
