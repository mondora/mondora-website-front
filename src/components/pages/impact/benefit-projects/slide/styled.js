import styled from "styled-components";
import Description from "../../../../description";

export const ProjectWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 24px;
`;

export const Image = styled.img`
    width: 100%;
`;

export const Caption = styled.div`
    margin: 64px 0 24px 0;
    text-transform: uppercase;
    color: var(--text-light-gray);
    font-size: 12pt;
`;

export const CenteredDescription = styled(Description)`
    text-align: center;
`;
