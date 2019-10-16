import React, { useState } from "react";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

import Menu from "./menu";
import Footer from "./footer";
import CookiesAlert from "../cookies-alert";

const Container = styled.div`
    display: grid;
`;

const MenuContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
`;

const ContentContainer = styled.div`
    grid-area: 2 / 1 / 3 / 2;
`;

const FooterContainer = styled.div`
    grid-area: 3 / 1 / 4 / 2;
`;

const Layout = ({ children }) => {
    const [hide, setHidden] = useState(
        typeof window !== "undefined"
            ? window.localStorage.getItem("cookies-alert-hidden")
            : false
    );

    const handleHide = () => {
        typeof window !== "undefined" &&
            window.localStorage.setItem("cookies-alert-hidden", true);
        setHidden(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <MenuContainer>
                    <Menu />
                </MenuContainer>
                <ContentContainer>{children}</ContentContainer>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
            <CookiesAlert show={!hide} onHide={handleHide} />
        </ThemeProvider>
    );
};

export default Layout;
