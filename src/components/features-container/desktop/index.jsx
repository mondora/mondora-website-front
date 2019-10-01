import React from "react";

import styled from "styled-components";

const FeaturesContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 32px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const FeatureTitle = styled.div`
    font-size: 14pt;
`;
const FeatureText = styled.div`
    color: var(--border-gray);
    line-height: 1.5;
    margin-top: 16px;
`;

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
