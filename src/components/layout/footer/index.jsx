import React from "react";

import styled from "styled-components";

import { Link } from "gatsby";

import StackPanel from "../../stackpanel";

import SocialLink from "../../../components/social-link";

import mondoraMiniLogoPath from "../assets/mondora-mini-logo.svg";

import {
    faGithub,
    faLinkedin,
    faFacebook,
    faTwitter,
    faInstagram,
    faYoutube
} from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
    padding: 30px 16px;
    font-size: ${props => props.theme.size.text.subtle};

    color: var(--white);
    background-color: var(--background-dark-gray);

    @media (max-width: 768px) {
        padding: 30px 16px;
    }
`;

const FooterContainer = styled.div`
    max-width: 1440px;
    margin: auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
`;

const MiniLogo = styled(Link)`
    width: 56px;
    background: url(${mondoraMiniLogoPath});
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Info = styled.div`
    grid-area: 1 / 2 / 2 / 3;

    @media (max-width: 768px) {
        grid-area: 1 / 1 / 2 / 1;
    }
`;

const Contacts = styled.div`
    grid-area: 2 / 2 / 3 / 4;

    @media (max-width: 768px) {
        grid-area: 2 / 1 / 3 / 1;
    }
`;

const ContactLink = styled.a`
    text-decoration: none;
    color: var(--white);
    padding: 2px;
`;

const Social = styled.div`
    grid-area: 1 / 3 / 2 / 4;

    @media (max-width: 768px) {
        grid-area: 3 / 1 / 4 / 1;
        padding-top: 0;
    }
`;

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

const Footer = () => {
    return (
        <Container justify="center">
            <FooterContainer>
                <MiniLogo to={"/"} />

                <Info>
                    <StackPanel direction="column" gutter={4} padding={8}>
                        <div>
                            {`© 2018 mondora srl sb . All Rights Reserved.`}{" "}
                        </div>
                        <div>
                            {`Via Uberto Visconti di Modrone 33 , 20122, Milano - P.IVA 03680680968`}
                        </div>
                        <div>{`Made with love ❤ in Valtellina`} </div>
                    </StackPanel>
                </Info>

                <Contacts>
                    <StackPanel justify="start" padding={8}>
                        <ContactLink href="tel:+3903421856456">
                            {"+39 0342 1856456"}
                        </ContactLink>
                        <ContactLink
                            href="mailto:info@mondora.com"
                            target="_blank"
                        >
                            {"- info@mondora.com"}
                        </ContactLink>
                    </StackPanel>
                </Contacts>

                <Social>
                    <StackPanel justify="space-between" padding={8}>
                        <span>
                            <StackPanel gutter={8}>
                                {Socials.map((social, i) => (
                                    <SocialLink
                                        key={i}
                                        type="light"
                                        text={social.text}
                                        url={social.url}
                                        icon={social.icon}
                                    ></SocialLink>
                                ))}
                            </StackPanel>
                        </span>
                    </StackPanel>
                </Social>
            </FooterContainer>
        </Container>
    );
};

export default Footer;
