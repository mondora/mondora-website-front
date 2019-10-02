import React, { useState } from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import mondoraLogoPath from "../../assets/mondora-logo.svg";

const Container = styled.div`
    background-color: var(--white);

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

const MobileMenu = () => {
    return (
        <Container>
            <ClosedMenu>
                <MiniLogo to={"/"} />
            </ClosedMenu>
        </Container>
    );
};

export default MobileMenu;
