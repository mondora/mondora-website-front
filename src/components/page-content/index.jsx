import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Markdown from "../markdown";
import MaxWidthContainer from "../max-width-container";

const ContentInner = styled.div`
    width: 100%;
    margin: 1.5em auto 2em;

    @media (min-width: ${props => props.theme.breakpoints[0]}px) {
        margin: 2em auto 3em;
    }

    @media (min-width: ${props => props.theme.breakpoints[1]}px) {
        width: 75%;
        margin: 3em auto 5em;
    }
`;

const PageContent = ({ children }) => (
    <main>
        <MaxWidthContainer>
            <ContentInner>
                <Markdown data={children} />
            </ContentInner>
        </MaxWidthContainer>
    </main>
);

PageContent.propTypes = {
    children: PropTypes.object.isRequired
};

export default PageContent;
