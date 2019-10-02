import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import StackPanel from "../../../stackpanel";
import mondoraLogoPath from "../../assets/mondora-logo.svg";

const Container = styled.div`
    padding: 30px 16px;
    max-width: 1440px;
    margin: auto;

    @media (max-width: 790px) {
        display: none;
    }
`;

const MiniLogo = styled(Link)`
    width: 162px;
    background: url(${mondoraLogoPath});
    background-repeat: no-repeat;
`;

const DesktopMenu = () => (
    <Container>
        <StackPanel justify="space-between">
            <StackPanel>
                <MiniLogo to={"/"} />
            </StackPanel>
            <StackPanel gutter={16} align="center">
                {"website under construction"}
            </StackPanel>
        </StackPanel>
    </Container>
);

export default DesktopMenu;
