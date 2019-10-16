import React from "react";
import Grid from "../../grid";
import { ContactIcon, ContactName, ContactBody } from "./styled";
import EmailIcon from "../../../../static/images/email.svg";
import PhoneIcon from "../../../../static/images/phone.svg";
import MobileIcon from "../../../../static/images/mobile.svg";

const KeepInTouch = () => (
    <>
        <Grid item container direction="column">
            <h1>Keep in touch</h1>
            <Grid item xs={12} md={10}>
                Whether you are interested in working with us on a custom
                software solution for your business, or are just curious about
                the :m world, we would love to get in touch!
            </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} md={3} direction="column" align="center">
                <ContactIcon src={EmailIcon} />
                <ContactName>Email:</ContactName>
                <ContactBody>info@mondora.com</ContactBody>
            </Grid>
            <Grid xs={12} md={3} item direction="column" align="center">
                <ContactIcon src={PhoneIcon} />
                <ContactName>Phone:</ContactName>
                <ContactBody>+39 0342 1856 456</ContactBody>
            </Grid>
            <Grid xs={12} md={3} item direction="column" align="center">
                <ContactIcon src={MobileIcon} />
                <ContactName>Mobile:</ContactName>
                <ContactBody>+39 345 9960 097</ContactBody>
            </Grid>
        </Grid>
    </>
);

export default KeepInTouch;
