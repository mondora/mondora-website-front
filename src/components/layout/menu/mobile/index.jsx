import React, { useState } from "react";
import { Link } from "gatsby";

import styled from "styled-components";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StackPanel from "../../../stackpanel";

import mondoraLogoPath from "../../assets/mondora-logo.svg";

const Container = styled.div`
    background-color: var(--background-dark-gray);

    @media (min-width: 790px) {
        display: none;
    }
`;

const ClosedMenu = styled.div`
    display: flex;
    justify-content: space-between;
    height: 65px;
    padding: 0 16px;
`;

const MiniLogo = styled(Link)`
    width: 130px;
    background: url(${mondoraLogoPath});
    background-repeat: no-repeat;
    background-position: center;
`;

const BurgerBunner = styled(FontAwesomeIcon)`
    font-size: 16pt;
    color: var(--white);
`;

const Item = styled.div`
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border-bottom: 1px solid var(--border-dark-gray);
    color: var(--white);
`;

const OpenedMenu = styled.div`
    border-top: 1px solid var(--white);
`;

const MobileMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <Container>
            <ClosedMenu>
                <MiniLogo to={"/"} />
                <StackPanel gutter={16} align="center">
                    <BurgerBunner
                        icon={faBars}
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    />
                </StackPanel>
            </ClosedMenu>
            {isMenuOpen && (
                <OpenedMenu>
                    <Item>{"website under construction"}</Item>
                </OpenedMenu>
            )}
        </Container>
    );
};

export default MobileMenu;
