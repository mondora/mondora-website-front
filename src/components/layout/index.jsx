import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

import Menu from "./menu";
import Footer from "./footer";

import logoWhite from "./assets/mondora-logo-white.svg";

const Container = styled.div`
    display: grid;
`;

const MenuContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
`;

const ContentContainer = styled.div`
    grid-area: 2 / 1 / 3 / 2;

    > * {
        padding: 0px 16px;
    }
`;

const FooterContainer = styled.div`
    grid-area: 3 / 1 / 4 / 2;
`;

//TODO temporary component
const BlurredWrapper = styled.div`
    filter: blur(2px);
`;

const TemporaryTitle = styled.h1`
    color: var(--white);
    font-size: 56px;
`;

const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const WhiteLogo = styled.img`
    max-width: 300px;
`;
//---------------------

const Layout = ({ children }) => (
    <ThemeProvider theme={theme}>
        <div>
            <Overlay>
                <WhiteLogo src={logoWhite} />
                <TemporaryTitle>{"We are on strike"}</TemporaryTitle>
                <iframe
                    title="Greta speech"
                    width="50%"
                    height="50%"
                    src="https://www.youtube.com/embed/KAJsdgTPJpU"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </Overlay>
            <BlurredWrapper>
                <Container>
                    <MenuContainer>
                        <Menu />
                    </MenuContainer>
                    <ContentContainer>{children}</ContentContainer>
                    <FooterContainer>
                        <Footer />
                    </FooterContainer>
                </Container>
            </BlurredWrapper>
        </div>
    </ThemeProvider>
);

export default Layout;
