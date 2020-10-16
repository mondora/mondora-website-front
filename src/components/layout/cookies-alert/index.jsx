import React from "react";

import { graphql, useStaticQuery } from "gatsby";
import { useLocalStorageState } from "@umijs/hooks";

import styled from "styled-components";
import { Flex, Box } from "reflexbox";

import Subtitle from "../../subtitle";
import SquareButton from "../../square-button";

export const Container = styled.div`
    background: var(--white);
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 16px;
    border-radius: 4px;
    max-width: 472px;

    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
`;

const CookiesAlert = () => {
    const [isCookieOk, setCookieOk] = useLocalStorageState("isCookieOk", false);
    const { contentfulCookiesMessage } = useStaticQuery(graphql`
        query {
            contentfulCookiesMessage {
                buttonText
                text {
                    text
                }
            }
        }
    `);

    return (
        !isCookieOk && (
            <Container>
                <Flex margin={3} flexDirection="column">
                    <Box m={1}>
                        <Subtitle>
                            {contentfulCookiesMessage.text.text}
                        </Subtitle>
                    </Box>
                    <Flex m={1}>
                        <SquareButton onClick={() => setCookieOk(true)}>
                            {contentfulCookiesMessage.buttonText}
                        </SquareButton>
                    </Flex>
                </Flex>
            </Container>
        )
    );
};

export default () => {
    // Avoid mount on SSR 🤒
    if (typeof localStorage !== "undefined") {
        return <CookiesAlert />;
    }

    return null;
};
