import React from "react";

import styled from "styled-components";

import Title from "../../../title";

import Subtitle from "../../../subtitle";

import EmailIcon from   "./assets/email.svg";
import PhoneIcon from   "./assets/phone.svg";
import MobileIcon from  "./assets/mobile.svg";

import { Flex } from "reflexbox";

const ContactIcon = styled.img`
    height: 48px;
`;

const ContactName = styled.div`
    margin: 8px;
`;

const ContactBody = styled.div`
    font-size: 16px;
    color: var(--text-dark-gray);
`;

const KeepInTouch = () => (
    <>
        <Title>{"Keep in touch"}</Title>
        <Subtitle>
            {"Whether you are interested in working with us on a custom software solution for your business, or are just curious about the :m world, we would love to get in touch!"}
        </Subtitle>

        <Flex justifyContent="center">
            <Flex
                width={[1 / 2, 1 / 3]}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <ContactIcon src={EmailIcon} />
                <ContactName>{"Email:"}</ContactName>
                <ContactBody>{"info@mondora.com"}</ContactBody>
            </Flex>
            <Flex
                width={[1 / 2, 1 / 3]}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <ContactIcon src={PhoneIcon} />
                <ContactName>{"Phone:"}</ContactName>
                <ContactBody>{"+39 0342 1856 456"}</ContactBody>
            </Flex>
            <Flex
                width={[1 / 2, 1 / 3]}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <ContactIcon src={MobileIcon} />
                <ContactName>{"Mobile:"}</ContactName>
                <ContactBody>{"+39 345 9960 097"}</ContactBody>
            </Flex>
        </Flex>
    </>
);

export default KeepInTouch;
