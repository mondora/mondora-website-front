import styled from "styled-components";

// TODO: use styled components theming colors instead of CSS globals
export const ContactsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
`;

export const ContactName = styled.div`
    font-size: 32px;
`;

export const ContactBody = styled.div`
    margin-top: 16px;
    font-size: 16px;
    color: var(--text-dark-gray);
`;

export const ContactIcon = styled.img`
    margin-top: 16px;
    height: 100px;
`;
