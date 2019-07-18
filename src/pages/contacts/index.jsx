import React from "react";

import styled from "styled-components";

import Layout from "../../components/layout";

import SocialLink from "../../components/social-link";
import {
    faGithub,
    faLinkedin,
    faFacebook,
    faTwitter,
    faInstagram,
    faPinterest
} from "@fortawesome/free-brands-svg-icons";

import EmailIcon from "../../../static/images/email-icon.png";
import PhoneIcon from "../../../static/images/phone-icon.png";

const Container = styled.div`
    padding: 0 64px;
    margin-left: auto;
    display: grid;
    text-align: center;
    grid-template-columns: 1fr 32px 1fr;
    grid-column-gap: 16px;
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;
const Divider = styled.div`
    height: 100%;
    width: 100%;
`;
const Line = styled.div`
    border: 1px solid var(--black);
    @media (min-width: 992px) {
        margin: 0 auto;
        width: 0;
        height: 90%;
    }
    @media (max-width: 992px) {
        margin: 24px 10%;
        height: 0;
        width: 80%;
    }
`;
const Circle = styled.div`
    border: 2px solid var(--black);
    width: 28px;
    border-radius: 100%;
    height: 28px;
    @media (max-width: 992px) {
        display: none;
    }
`;
const LeftParagraph = styled.div`
    text-align: left;
    margin-top: 80px;
    margin-bottom: 40px;
    @media (max-width: 992px) {
        text-align: center;
    }
`;
const LeftTitle = styled.h1`
    margin-top: 16px;
    font-size: ${props => props.theme.size.text.mondora};
`;
const LeftContent = styled.div`
    width: 70%;
    margin: 24px auto 24px 0;
    line-height: 1.6;
    @media (max-width: 992px) {
        margin: 24px auto;
    }
`;
const ContactsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
`;
const ContactName = styled.div`
    font-size: 32px;
`;
const ContactBody = styled.div`
    margin-top: 16px;
    font-size: 16px;
    color: var(--text-dark-gra);
`;
const ContactIcon = styled.img`
    margin-top: 16px;
    height: 100px;
`;
const RightParagraph = styled.div`
    text-align: left;
    margin: 16px;
`;
const RightTitle = styled.div`
    margin-top: 40px;
    font-size: 32px;
`;
const RightContent = styled.div`
    width: 70%;
    margin: 16px 0;
    line-height: 1.6;
    @media (max-width: 992px) {
        margin: 24px auto;
    }
`;
const MapContainer = styled.div`
    margin-top: 80px;
    height: 400px;
    background-color: gray;
`;

const ContactInfo = [
    {
        icon: EmailIcon,
        title: "Email:",
        text: "info@mondora.com"
    },
    {
        icon: PhoneIcon,
        title: "Phone:",
        text: "+39 0342 1856 456 "
    }
];
const Addresses = [
    {
        title: "Operative Office:",
        address: "Via Europa 1250, 23020 Berbenno di Valtellina (SO)",
        phone: "Phone: +39 0342 1856 456 "
    },
    {
        title: "Legal office",
        address: "Via Uberto Visconti di Modrone 33, 20122, Milano",
        phone: ""
    }
];
const Socials = [
    {
        type: "dark",
        url: "https://github.com/mondora/",
        text: "GitHub",
        icon: faGithub
    },
    {
        type: "dark",
        url: "https://www.instagram.com/mondoracom/",
        icon: faInstagram
    },
    {
        type: "light",
        url: "https://it-it.facebook.com/mondoracom/",
        icon: faFacebook
    },
    {
        type: "dark",
        url: "https://www.linkedin.com/company/mondora-s-p-a-/",
        icon: faLinkedin
    },
    {
        url: "https://twitter.com/mondora",
        icon: faTwitter
    },
    {
        type: "dark",
        url: "https://www.pinterest.it/mondoracom/",
        icon: faPinterest
    }
];

const Contacts = () => (
    <Layout>
        <Container>
            <LeftParagraph>
                <LeftTitle>{"Keep in touch"}</LeftTitle>
                <LeftContent>
                    {
                        "Whether you are interested in working with us on a custom software solution for your business, or are just curious about the :m world, we would love to get in touch! "
                    }
                </LeftContent>
                <ContactsWrapper>
                    {ContactInfo.map(contact => (
                        <div>
                            <ContactIcon src={contact.icon} />
                            <ContactName>{contact.title}</ContactName>
                            <ContactBody>{contact.text}</ContactBody>
                        </div>
                    ))}
                </ContactsWrapper>
            </LeftParagraph>
            <Divider>
                <Line></Line>
                <Circle></Circle>
            </Divider>
            <RightParagraph>
                {Addresses.map(address => (
                    <div>
                        <RightTitle>{address.title}</RightTitle>
                        <RightContent>{address.address}</RightContent>
                    </div>
                ))}
                <RightTitle>{"Follow us on:"}</RightTitle>

                <div style={{ display: "flex" }}>
                    {Socials.map(social => (
                        <SocialLink
                            type="dark"
                            text={social.text}
                            url={social.url}
                            icon={social.icon}
                        ></SocialLink>
                    ))}
                </div>
            </RightParagraph>
        </Container>
        {/* TODO: aggiungere mappa google */}
        <MapContainer>{"google maps"}</MapContainer>
    </Layout>
);

export default Contacts;
