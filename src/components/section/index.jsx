import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const SectionContainer = styled.div`
    padding: 0;
    margin: ${props => props.margin};
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 2px 1fr;
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
        padding: 8px;
    }
`;

const Divider = styled.div`
    height: 100%;
    width: 100%;
    overflow: visible;
    position: relative;
    top: ${props => props.top};
`;
const Line = styled.div`
    border: 1px solid var(--black);
    @media (min-width: 992px) {
        margin: 0 auto;
        width: 0;
        height: 100%;
    }
    @media (max-width: 992px) {
        margin: 24px 10%;
        height: 0;
        width: 80%;
    }
`;
const Circle = styled.div`
    border: 2px solid var(--black);
    width: 28px;
    border-radius: 100%;
    height: 28px;
    position: relative;
    left: -15px;
    @media (max-width: 992px) {
        display: none;
    }
`;

const Section = ({ children, position, offset, margin }) => {
    return (
        <SectionContainer margin={margin}>
            <>{children[0]}</>
            <Divider top={offset}>
                {(position === "both") | (position === "above") ? (
                    <Circle />
                ) : (
                    ""
                )}
                <Line></Line>
                {(position === "both") | (position === "below") ? (
                    <Circle />
                ) : (
                    ""
                )}
            </Divider>
            <>{children[1]}</>
        </SectionContainer>
    );
};
Section.propTypes = {
    children: PropTypes.object,
    position: PropTypes.string,
    top: PropTypes.string,
    margin: PropTypes.string
};
Section.defaultProps = {
    children: {
        0: <div/>,
        1: <div/>
    },
    top: "0px",
    margin: "40px 0 80px 0"
};

export default Section;
