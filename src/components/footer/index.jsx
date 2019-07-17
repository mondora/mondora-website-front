import React from "react";

import styled from "styled-components";

import StackPanel from "../stackpanel";

import SocialLink from "../../components/social-link";

import {
    faGithub,
    faLinkedin,
    faFacebook,
    faTwitter,
    faInstagram,
    faPinterest
} from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
    padding: 32px 192px;
    font-size: ${props => props.theme.size.text.subtle};

    color: ${props => props.theme.colors.text.contrast};
    background-color: ${props => props.theme.colors.background.darkGray};

    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto auto;
    grid-column-gap: 16px;
    grid-row-gap: 16px;

    @media (max-width: 992px) {
        padding: 32px 16px;
        grid-template-columns: auto 1fr;
    }
`;

const MiniLogo = styled.div`
    &:before {
        color: #ffea00;
        content: ":";
    }
    margin-top: -10px;
    grid-area: 1 / 1 / 3 / 2;
    font-size: ${props => props.theme.size.text.megaM};
    /* background-color: rebeccapurple; */

    @media (max-width: 992px) {
        grid-area: 1 / 1 / 2 / 2;
    }
`;

const Info = styled.div`
    grid-area: 1 / 2 / 2 / 3;
    /* background-color: blue; */

    @media (max-width: 992px) {
        grid-area: 1 / 2 / 2 / 3;
    }
`;

const Projects = styled.div`
    grid-area: 1 / 3 / 2 / 4;
    /* background-color: darkgreen; */

    @media (max-width: 992px) {
        grid-area: 2 / 1 / 3 / 3;
    }
`;

const Misc = styled.div`
    grid-area: 2 / 2 / 3 / 4;
    /* background-color: green; */

    @media (max-width: 992px) {
        grid-area: 3 / 1 / 4 / 3;
    }
`;
const Menuitem = styled.div`
    display: block;
    margin: 0;
    width: 20%;
    padding: 5px;
`;
const SocialLogo = styled.img`
    display: block;
    margin: 0;
    width: 50px;
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
        url: "https://www.pinterest.it/mondoracom/",
        icon: faPinterest
    }
];

const Footer = () => (
    <Container justify="center">
        <MiniLogo>{"m"}</MiniLogo>

        <Info>
            <StackPanel direction="column">
                <span>
                    <p>{`© 2018 mondora srl sb . All Rights Reserved.`}</p>
                    <p>{`Via Uberto Visconti di Modrone 33 , 20122, Milano`}</p>
                    <p>{`P.IVA 03680680968`}</p>
                    <p>{`Made with love ❤ in Valtellina`}</p>
                </span>
            </StackPanel>
        </Info>

        <Projects>
            <StackPanel align="flex-end" direction="column">
                <span>
                    <p>{`Discover our projects:`}</p>
                </span>
                <StackPanel gutter={24}>
                    <span>{`project1`}</span>
                    <span>{`project2`}</span>
                </StackPanel>
            </StackPanel>
        </Projects>

        <Misc>
            <StackPanel justify="space-between">
                <span>
                    <p>{`+39 0342 1856456 - info@mondora.com`}</p>
                </span>
                <span>
                    <div style={{ display: "flex" }}>
                        {Socials.map(social => (
                            <SocialLink
                                type="light"
                                text={social.text}
                                url={social.url}
                                icon={social.icon}
                            ></SocialLink>
                        ))}
                    </div>
                </span>
            </StackPanel>
        </Misc>
    </Container>
);

export default Footer;
