import React from "react";

import styled from "styled-components";

import {
    faGithub,
    faLinkedin,
    faFacebook,
    faTwitter,
    faInstagram,
    faYoutube
} from "@fortawesome/free-brands-svg-icons";

import Layout from "../../components/layout";
import SocialLink from "../../components/social-link";
import StackPanel from "../../components/stackpanel";
import Section from "../../components/section";
import Divider from "../../components/divider";
import ContactsMap from "../../components/contacts-map";

import EmailIcon from "../../../static/images/email-icon.png";
import PhoneIcon from "../../../static/images/phone-icon.png";
import MobileIcon from "../../../static/images/mobile-icon.png";

const LeftParagraph = styled.div`
    text-align: left;
    margin: 40px 32px;
    @media (max-width: 992px) {
        text-align: center;
    }
`;
const LeftTitle = styled.h1`
    margin: 16px auto 0 24px;
    font-size: ${props => props.theme.size.text.mondora};
`;
const LeftContent = styled.div`
    width: 70%;
    margin: 24px auto 24px 24px;
    line-height: 1.6;
    @media (max-width: 992px) {
        margin: 24px auto;
    }
`;
const ContactsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
    margin: 32px;
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
    },
    {
        icon: MobileIcon,
        title: "Mobile:",
        text: "+39 345 9960 097"
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
        url: "https://www.youtube.com/channel/UCeAVpel9SZj6WKHWLEtVlsg",
        icon: faYoutube
    }
];
const mapSettings = {
    position: {
      lat: 46.161530,
      lng: 9.758879,
    },
    zoom: 15,
  }

const Contacts = () => (
    <Layout>
        <Section gutter={32}>
            <Section.LeftContainer>
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
            </Section.LeftContainer>

            <Section.DividerContainer>
                <Divider />
            </Section.DividerContainer>

            <Section.RightContainer>
                <RightParagraph>
                    {Addresses.map(address => (
                        <div>
                            <RightTitle>{address.title}</RightTitle>
                            <RightContent>{address.address}</RightContent>
                        </div>
                    ))}
                    <RightTitle>{"Follow us on:"}</RightTitle>

                    <StackPanel gutter={8}>
                        {Socials.map(social => (
                            <SocialLink
                                type="dark"
                                text={social.text}
                                url={social.url}
                                icon={social.icon}
                            ></SocialLink>
                        ))}
                    </StackPanel>
                </RightParagraph>
            </Section.RightContainer>
        </Section>
        <MapContainer><ContactsMap position={mapSettings.position} zoom={mapSettings.zoom}/></MapContainer>
    </Layout>
);

export default Contacts;
