import React from "react";

import PropTypes from "prop-types";

import styled from "styled-components";

import Title from "../../../title";
import ParagraphTitle from "../../../paragraph-title";
import Subtitle from "../../../subtitle";

import EmailIcon from "./assets/email.svg";

import { Flex, Box } from "reflexbox";

const ContactIcon = styled.img`
    height: 64px;
`;

const ContactInfo = styled(Subtitle)`
    word-break: break-all;
`;

const KeepInTouch = ({ contactInfo, header, description }) => {
    const contacts = [
        { icon: EmailIcon, title: "Email:", value: contactInfo.email }
    ];
    return (
        <>
            <Title>{header}</Title>
            <Subtitle margin="32px 0">{description}</Subtitle>
            <Flex flexWrap="wrap">
                {contacts.map((contact, i) => (
                    <Box key={i} width={[1, 1 / 3]} p={2} textAlign="center">
                        <ContactIcon src={contact.icon} alt="" />
                        <ParagraphTitle>{contact.title}</ParagraphTitle>
                        <ContactInfo>{contact.value}</ContactInfo>
                    </Box>
                ))}
            </Flex>
        </>
    );
};

KeepInTouch.propTypes = {
    contactInfo: PropTypes.object,
    header: PropTypes.string,
    description: PropTypes.string
};

export default KeepInTouch;
