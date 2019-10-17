import React, { useState } from "react";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import {
    FeaturesContainer,
    Feature,
    FeatureTitle,
    FeatureArrow,
    FeatureText
} from "./styled";

const FeaturesMobile = ({ dark = false, features = [] }) => {
    const [isFeatureOpen, setFeatureOpen] = useState(null);
    return (
        <FeaturesContainer>
            {features.map((feature, key) => {
                return (
                    <div key={key}>
                        <Feature>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureArrow
                                dark={dark}
                                icon={
                                    isFeatureOpen === key
                                        ? faChevronUp
                                        : faChevronDown
                                }
                                onClick={() =>
                                    setFeatureOpen(
                                        isFeatureOpen !== key ? key : null
                                    )
                                }
                            />
                        </Feature>
                        {isFeatureOpen === key && (
                            <FeatureText>{feature.description}</FeatureText>
                        )}
                    </div>
                );
            })}
        </FeaturesContainer>
    );
};

export default FeaturesMobile;
