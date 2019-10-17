import React from "react";

import styled from "styled-components";

import { Link } from "gatsby";

import StackPanel from "../../stackpanel";

import MaxWidthContainer from "../../max-width-container";
import { SocialLink } from "../../../components/social-link";

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

const FooterContainer = styled(MaxWidthContainer)`
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

const SectionsContainer = styled.div`
    grid-area: 1 / 3 / 3 / 4;
    grid-template-columns: 25% 25% 25% 25%;
    display: grid;

    @media (max-width: 768px) {
        grid-area: 4 / 1 / 5 / 1;
        grid-template-columns: 50% 50%;
    }
`;

const SectionLinks = styled(Link)`
    font-size: 11pt;
    text-decoration: none;
    color: var(--white);
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

                <SectionsContainer>
                    <StackPanel direction="column" padding={16}>
                        <span>{`ABOUT`}</span>
                        <SectionLinks to={"/about"}>{`About us`}</SectionLinks>
                        <SectionLinks
                            to={"/meet-the-team"}
                        >{`Meet the team`}</SectionLinks>
                        <SectionLinks
                            to={"/contacts"}
                        >{`Contacts`}</SectionLinks>
                    </StackPanel>
                    <StackPanel direction="column" padding={16}>
                        <span>{`WORK WITH US`}</span>
                        <SectionLinks
                            to={"/work-with-us"}
                        >{`Work with us`}</SectionLinks>
                        <SectionLinks>{`Mondora handbook`}</SectionLinks>
                    </StackPanel>
                    <StackPanel direction="column" padding={16}>
                        <span>{`IMPACT`}</span>
                        <SectionLinks to={"/bcorp"}>{`Impact`}</SectionLinks>
                        <SectionLinks>{`Blog BCalm BCorp`}</SectionLinks>
                        <SectionLinks>{"Blog tecnico"}</SectionLinks>
                    </StackPanel>
                    <StackPanel direction="column" padding={16}>
                        <span>{`SIDE PROJECTS`}</span>
                        <SectionLinks>{`Hirebitto`}</SectionLinks>
                        <SectionLinks>{`Cycle2Work`}</SectionLinks>
                        <SectionLinks>{"Minicoder"}</SectionLinks>
                    </StackPanel>
                </SectionsContainer>

                <Contacts>
                    <StackPanel justify="space-between" padding={8}>
                        <span>{`+39 0342 1856456 - info@mondora.com`}</span>
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
