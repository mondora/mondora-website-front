import React from "react";

import rehypeReact from "rehype-react";
import PropTypes from "prop-types";

import styled from "styled-components";

import Divider from "../divider";
import Title from "../title";
import Subtitle from "../subtitle";
import Section from "../section";
import JumboTitle from "../jumbo-title";
import MaxWidthContainer from "../max-width-container";
import BackgroundStripe from "../background-stripe";

const marginSubtitle = styled(Subtitle)`
    margin: 32px 0 0 0;
`;

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { h1: JumboTitle, h2: Title, p: marginSubtitle }
}).Compiler;

const Header = ({ left, right }) => (
    <BackgroundStripe>
        <MaxWidthContainer>
            <Section header={true}>
                <Section.LeftContainer>{renderAst(left)}</Section.LeftContainer>
                <Section.DividerContainer>
                    <Divider />
                </Section.DividerContainer>
                <Section.RightContainer>
                    {renderAst(right)}
                </Section.RightContainer>
            </Section>
        </MaxWidthContainer>
    </BackgroundStripe>
);

Header.propTypes = {
    left: PropTypes.object,
    right: PropTypes.object
};

export default Header;
