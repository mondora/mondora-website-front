import React from "react";

import { FeaturesContainer, FeatureTitle, FeatureText } from "./styled";

const FeaturesDesktop = ({ features = [] }) => (
    <FeaturesContainer>
        {features.map((feature, key) => {
            return (
                <div key={key}>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureText>{feature.description}</FeatureText>
                </div>
            );
        })}
    </FeaturesContainer>
);

export default FeaturesDesktop;
