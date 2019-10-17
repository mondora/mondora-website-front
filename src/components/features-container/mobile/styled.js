import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FeaturesContainer = styled.div`
    border-bottom: 1pt solid var(--border-gray);
    padding-top: 40pt;

    @media (min-width: ${props => props.theme.breakpoints.sm}px) {
        display: none;
    }
`;

export const Feature = styled.div`
    display: flex;
    justify-content: space-between;
    height: 63pt;
    align-items: center;
    border-top: 1pt solid var(--border-gray);
`;

export const FeatureArrow = styled(FontAwesomeIcon)`
    font-size: 18pt;
    color: ${props => (props.dark ? "var(--white)" : "var(--black)")};
`;

export const FeatureTitle = styled.div`
    font-size: 18pt;
`;
export const FeatureText = styled.div`
    color: var(--text-gray);
    line-height: 1.5;
    margin-bottom: 16px;
`;
