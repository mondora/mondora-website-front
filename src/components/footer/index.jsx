import React from "react";

import styled from "styled-components";

import StackPanel from "../stackpanel";

import twitterLogo from "../../../static/images/twitter.png"
import instagramLogo from "../../../static/images/instagram.png"
import facebookLogo from "../../../static/images/facebook.png"
import linkedinLogo from "../../../static/images/linkedin.png"
import pinterestLogo from "../../../static/images/pinterest.png"

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
    &:before{
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
const links = [
    {
        to: "https://www.instagram.com/mondoracom/",
        text: "Instagram",
        logo: instagramLogo
    },
    {
        to: "https://it-it.facebook.com/mondoracom/",
        text: "Facebook",
        logo: facebookLogo
    },
    {
        to: "https://www.linkedin.com/company/mondora-s-p-a-/?originalSubdomain=it",
        text: "Linkedin",
        logo: linkedinLogo
    },
    {
        to: "https://twitter.com/mondora",
        text: "Twitter",
        logo: twitterLogo
    },
    {
        to: "https://www.pinterest.it/mondoracom/",
        text: "Pinterest",
        logo: pinterestLogo
    },
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
                        
                    <StackPanel gutter={16}>
                        {links.map(link => (
                            <Menuitem>
                                 <a href={link.to}><SocialLogo src={link.logo}/></a>
                                
                            </Menuitem>
                        ))}
                    </StackPanel>
                </span>
            </StackPanel>
        </Misc>
    </Container>
);

export default Footer;
