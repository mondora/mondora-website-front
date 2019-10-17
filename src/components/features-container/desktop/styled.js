import styled from "styled-components";

export const FeaturesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 32px;
    padding-top: 20pt;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const FeatureTitle = styled.div`
    font-size: 14pt;
`;
export const FeatureText = styled.div`
    color: var(--text-gray);
    line-height: 1.5;
    margin-top: 16px;
`;
