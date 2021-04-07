import React from "react";

import PropTypes from "prop-types";
import Image from "gatsby-image";

import MaxWidthContainer from "../../../max-width-container";
import BackgroundStripe from "../../../background-stripe";
import AstText from "../../../ast-text";
import ReasonsRow from "../../../reasons-row";

const WhatWeCanDo = ({ logo, reasons, paragraph }) => (
    <BackgroundStripe>
        <MaxWidthContainer justifyContent="center">
            <Image fixed={logo.fixed} alt={logo.title} />
        </MaxWidthContainer>
        <MaxWidthContainer mt={16}>
            <AstText data={paragraph} />
        </MaxWidthContainer>
        <ReasonsRow reasons={reasons} />
    </BackgroundStripe>
);

WhatWeCanDo.propTypes = {
    logo: PropTypes.object,
    reasons: PropTypes.array,
    paragraph: PropTypes.object
};

export default WhatWeCanDo;
