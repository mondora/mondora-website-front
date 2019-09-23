import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import StackPanel from "../../../stackpanel";

import mondoraLogoPath from "../../assets/mondora-logo.svg";
import burgerBannerPath from "../../assets/burger_menu.png";

const Container = styled.div`
    background-color: var(--background-dark-gray);
    padding: 20px 16px;
`;

const MiniLogo = styled(Link)`
    width: 130px;
    background: url(${mondoraLogoPath});
    background-repeat: no-repeat;
`;

const BurgerBunner = styled.img`
    width: 16pt;
`;

const MobileMenu = () => {
    return (
        <Container>
            <StackPanel justify="space-between">
                <StackPanel>
                    <MiniLogo to={"/"} />
                </StackPanel>

                <StackPanel gutter={16} align="center">
                    <BurgerBunner src={burgerBannerPath} />
                </StackPanel>
            </StackPanel>
        </Container>
    );
};

export default MobileMenu;
