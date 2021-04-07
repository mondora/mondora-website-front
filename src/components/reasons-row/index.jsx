import React from "react";

import PropTypes from "prop-types";

import { Box } from "reflexbox";

import Subtitle from "../subtitle";
import ParagraphTitle from "../paragraph-title";
import MaxWidthContainer from "../max-width-container";
import BackgroundStripe from "../background-stripe";

const ReasonsRow = ({ reasons }) => (
    <BackgroundStripe>
        <MaxWidthContainer>
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

ReasonsRow.propTypes = {
    reasons: PropTypes.array
};

export default ReasonsRow;
