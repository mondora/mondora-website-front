import React from "react";

import PropTypes from "prop-types";

import { Box } from "reflexbox";
import Image from "gatsby-image";

import Subtitle from "../../../subtitle";
import ParagraphTitle from "../../../paragraph-title";
import MaxWidthContainer from "../../../max-width-container";
import BackgroundStripe from "../../../background-stripe";
import AstText from "../../../ast-text";

const WhatWeCanDo = ({ logo, reasons, paragraph }) => (
    <BackgroundStripe>
        <MaxWidthContainer justifyContent="center">
            <Image fixed={logo.fixed} alt={logo.title} />
        </MaxWidthContainer>
        <MaxWidthContainer mt={16}>
            <AstText data={paragraph} />
        </MaxWidthContainer>

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
