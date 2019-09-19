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
    padding: 30px 120px;
    font-size: ${props => props.theme.size.text.subtle};

    color: var(--white);
    background-color: var(--background-dark-gray);

    display: grid;
    grid-template-columns: auto 1fr auto;

    @media (max-width: 768px) {
        padding: 30px 16px;
        
`;

const MiniLogo = styled(Link)`
    width: 56px;
    background: url(${mondoraMiniLogoPath});
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        background: none;
    }
`;

const Info = styled.div`
    grid-area: 1 / 2 / 2 / 3;

    @media (max-width: 768px) {
        grid-area: 1 / 1 / 2 / 1;
    }
`;

const SectionsLinks = styled.div`
    grid-area: 1 / 3 / 3 / 4;

    @media (max-width: 768px) {
        grid-area: 4 / 1 / 5 / 1;
        padding-top: 16px;
    }
`;

const Contacts = styled.div`
    grid-area: 2 / 2 / 3 / 4;

    @media (max-width: 768px) {
        grid-area: 2 / 1 / 3 / 1;
    }
`;

const Social = styled.div`
    grid-area: 3 / 2 / 4 / 4;
    padding-top: 10px;

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

const Footer = () => (
    <Container justify="center">
        <MiniLogo />

        <Info>
            <StackPanel direction="column" gutter={4} padding={8}>
                <span>{`© 2018 mondora srl sb . All Rights Reserved.`} </span>
                <span>
                    {`Via Uberto Visconti di Modrone 33 , 20122, Milano - P.IVA 03680680968`}
                </span>
                <span>{`Made with love ❤ in Valtellina`} </span>
            </StackPanel>
        </Info>

        <SectionsLinks>
            <StackPanel direction="row">
                <StackPanel direction="column" padding={8}>
                    <span>{`ABOUT`}</span>
                    <span>{`About us`}</span>
                    <span>{`Meet the team`}</span>
                    <span>{`Contacts`}</span>
                </StackPanel>
                <StackPanel direction="column" padding={8}>
                    <span>{`WORK WITH US`}</span>
                    <span>{`Work with us`}</span>
                    <span>{`Mondora handbook`}</span>
                </StackPanel>
                <StackPanel direction="column" padding={8}>
                    <span>{`IMPACT`}</span>
                    <span>{`Impact`}</span>
                    <span>{`Blog BCalm BCorp`}</span>
                    <span>{"Blog tecnico"}</span>
                </StackPanel>
                <StackPanel direction="column" padding={8}>
                    <span>{`SIDE PROJECTS`}</span>
                    <span>{`Hirebitto`}</span>
                    <span>{`Cycle2Work`}</span>
                    <span>{"Minicoder"}</span>
                </StackPanel>
            </StackPanel>
        </SectionsLinks>

        <Contacts>
            <StackPanel justify="space-between" padding={8}>
                <span>{`+39 0342 1856456 - info@mondora.com`}</span>
            </StackPanel>
        </Contacts>

        <Social>
            <StackPanel justify="space-between" padding={8}>
                <span>
                    <StackPanel gutter={8}>
                        {Socials.map(social => (
                            <SocialLink
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
    </Container>
);

export default Footer;
