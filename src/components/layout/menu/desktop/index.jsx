import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import StackPanel from "../../../stackpanel";
import mondoraLogoPath from "../../assets/mondora-logo.svg";

const Container = styled.div`
    padding: 20px 16px;
    max-width: 1440px;
    margin: auto;

    @media (max-width: 790px) {
        display: none;
    }
`;

const MiniLogo = styled(Link)`
    width: 162px;
    height: 65px;
    background: url(${mondoraLogoPath});
    background-repeat: no-repeat;
    background-position: center;
`;

const DesktopMenu = () => (
    <Container>
        <StackPanel justify="space-between">
            <StackPanel>
                <MiniLogo to={"/"} />
            </StackPanel>
        </StackPanel>
    </Container>
);

export default DesktopMenu;
