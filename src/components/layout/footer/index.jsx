import React from "react";
import styled from "styled-components";
import Grid from "../../grid";
import Hidden from "../../hidden";
import DesktopFooter from "./desktop";
import MobileFooter from "./mobile";
import TabletFooter from "./tablet";

const RootGrid = styled(Grid)`
    font-size: ${props => props.theme.size.text.subtle};
    color: var(--white);
    background: var(--background-dark-gray);
    padding: ${props => props.theme.spacing.unit * 8}px 0;
`;

const Footer = () => (
    <RootGrid container xs={12} justify="center">
        <Hidden mdDown>
            <DesktopFooter />
        </Hidden>
        <Hidden smDown mdUp>
            <TabletFooter />
        </Hidden>
        <Hidden smUp>
            <MobileFooter />
        </Hidden>
    </RootGrid>
);

export default Footer;
