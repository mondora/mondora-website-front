import React from "react";

import FeaturesDesktop from "./desktop";
import FeaturesMobile from "./mobile";

const FeaturesContainer = ({ dark, features }) => {
    return (
        <>
            <FeaturesDesktop features={features} />
            <FeaturesMobile features={features} dark={dark} />
        </>
    );
};

export default FeaturesContainer;
