import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

import Menu from "./menu";
import Footer from "./footer";

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

const Layout = ({ children }) => (
    <ThemeProvider theme={theme}>
        <div>
            <Container>
                <MenuContainer>
                    <Menu />
                </MenuContainer>
                <ContentContainer>{children}</ContentContainer>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        </div>
    </ThemeProvider>
);

export default Layout;
