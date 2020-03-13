import React from "react";

import styled from "styled-components";

import Title from "../../../title";
import ParagraphTitle from "../../../paragraph-title";
import Subtitle from "../../../subtitle";

import EmailIcon from "./assets/email.svg";
import PhoneIcon from "./assets/phone.svg";
import MobileIcon from "./assets/mobile.svg";

import { Flex, Box } from "reflexbox";

const ContactIcon = styled.img`
    height: 64px;
`;

const ContactInfo = styled(Subtitle)`
    word-break: break-all;
`;

const contacts = [
    { icon: EmailIcon, title: "Email:", value: "info@mondora.com" },
    { icon: PhoneIcon, title: "Phone:", value: "+39 0342 1856 456" },
    { icon: MobileIcon, title: "Mobile:", value: "+39 345 9960 097" }
];

const KeepInTouch = () => (
    <>
        <Title>{"Keep in touch"}</Title>
        <Subtitle margin="32px 0">
            {
                "Whether you are interested in working with us on a custom software solution for your business, or are just curious about the :m world, we would love to get in touch!"
            }
        </Subtitle>

        <Flex flexWrap="wrap">
            {contacts.map((contact, i) => (
                <Box key={i} width={[1, 1 / 3]} p={2} textAlign="center">
                    <ContactIcon src={contact.icon} />
                    <ParagraphTitle>{contact.title}</ParagraphTitle>
                    <ContactInfo>{contact.value}</ContactInfo>
                </Box>
            ))}
        </Flex>
    </>
);

export default KeepInTouch;
