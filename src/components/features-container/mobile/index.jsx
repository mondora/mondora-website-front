import React, { useState } from "react";

import styled from "styled-components";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FeaturesContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    border-bottom: 1pt solid var(--border-gray);
    padding-top: 40pt;

    @media (min-width: 768px) {
        display: none;
    }
`;

const Feature = styled.div`
    display: flex;
    justify-content: space-between;
    height: 63pt;
    align-items: center;
    border-top: 1pt solid var(--border-gray);
`;

const FeatureArrow = styled(FontAwesomeIcon)`
    font-size: 18pt;
    color: ${props => (props.dark ? "var(--white)" : "var(--black)")};
`;

const FeatureTitle = styled.div`
    font-size: 18pt;
`;
const FeatureText = styled.div`
    color: var(--text-gray);
    line-height: 1.5;
    margin-bottom: 16px;
`;

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
