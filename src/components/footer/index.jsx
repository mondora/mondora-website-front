import React from "react";

import styled from "styled-components";

import StackPanel from "../stackpanel";

const Container = styled(StackPanel)`
    padding: 32px 192px;
    font-size: ${props => props.theme.size.text.subtle};
    line-height: 0.8;

    color: ${props => props.theme.colors.text.contrast};
    background-color: ${props => props.theme.colors.background.darkGray};

    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
`;

const MiniLogo = styled(StackPanel)`
    grid-area: 1 / 1 / 3 / 2;
    font-size: ${props => props.theme.size.text.mega};
    /* background-color: rebeccapurple; */
`;

const Info = styled(StackPanel)`
    grid-area: 1 / 2 / 2 / 3;
    /* background-color: blue; */
`;

const Projects = styled(StackPanel)`
    grid-area: 1 / 3 / 2 / 4;
    /* background-color: darkgreen; */
`;

const Misc = styled(StackPanel)`
    grid-area: 2 / 2 / 3 / 4;
    /* background-color: green; */
`;

const Footer = () => (
    <Container>
        <MiniLogo>{":m"}</MiniLogo>

        <Info>
            <span>
                <p>{`© 2018 mondora srl sb . All Rights Reserved.`}</p>
                <p>{`Via Uberto Visconti di Modrone 33 , 20122, Milano`}</p>
                <p>{`P.IVA 03680680968`}</p>
                <p>{`Made with love ❤ in Valtellina`}</p>
            </span>
        </Info>

        <Projects gutter={24} align="flex-end" direction="column">
            <span>
                <p>{`Discover our projects:`}</p>
            </span>
            <StackPanel>
                <span>{`project1`}</span>
                <span>{`project2`}</span>
            </StackPanel>
        </Projects>

        <Misc justify="space-between">
            <span>
                <p>{`+39 0342 1856456 - info@mondora.com`}</p>
            </span>
            <span>
                <p>{`socials`}</p>
            </span>
        </Misc>
    </Container>
);

export default Footer;
