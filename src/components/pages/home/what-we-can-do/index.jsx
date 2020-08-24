import React from "react";

import rehypeReact from "rehype-react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Box } from "reflexbox";
import Image from "gatsby-image";

import Title from "../../../title";
import Subtitle from "../../../subtitle";
import ParagraphTitle from "../../../paragraph-title";
import MaxWidthContainer from "../../../max-width-container";
import BackgroundStripe from "../../../background-stripe";

const MarginSubtitle = styled(Subtitle)`
    margin: 16px 24px 0 24px;
    text-align: center;
`;
const CenterTitle = styled(Title)`
    text-align: center;
`;

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        h2: CenterTitle,
        p: MarginSubtitle
    }
}).Compiler;

const WhatWeCanDo = ({ logo, reasons, paragraph }) => (
    <BackgroundStripe>
        <MaxWidthContainer justifyContent="center">
            <Image fixed={logo} />
        </MaxWidthContainer>
        <MaxWidthContainer mt={16}>{renderAst(paragraph)}</MaxWidthContainer>

        <MaxWidthContainer my={32}>
            {reasons.map((reason, i) => (
                <Box key={i} width={[1, 1, 1 / 3]} px={[0, 0, 24]} pt={[24, 0]}>
                    <ParagraphTitle center={[true, false]}>
                        {reason.title}
                    </ParagraphTitle>
                    <Subtitle center={[true, false]}>
                        {reason.description.description}
                    </Subtitle>
                </Box>
            ))}
        </MaxWidthContainer>
    </BackgroundStripe>
);

WhatWeCanDo.propTypes = {
    logo: PropTypes.object,
    reasons: PropTypes.array,
    paragraph: PropTypes.object
};

export default WhatWeCanDo;
