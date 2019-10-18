import React from "react";
import {
    faGithub,
    faLinkedin,
    faFacebook,
    faTwitter,
    faInstagram,
    faYoutube
} from "@fortawesome/free-brands-svg-icons";
import Grid from "../../../../grid";
import { SocialLink } from "../../../../social-link";

const InfoAndSocials = props => (
    <Grid container direction="column" spacingRatio={1} {...props}>
        <Grid item>© 2018 mondora srl sb . All Rights Reserved.</Grid>
        <Grid item>Via Uberto Visconti di Modrone 33, 20122, Milano</Grid>
        <Grid item>P.IVA 03680680968</Grid>
        <Grid item>Made with love ❤ in Valtellina</Grid>
        <Grid item>
            <p>+39 0342 1856 456 - info@mondora.com</p>
        </Grid>
        <Grid item container spacingRatio={2}>
            <Grid item>
                <SocialLink
                    type="light"
                    text="GitHub"
                    url="https://github.com/mondora/"
                    icon={faGithub}
                />
            </Grid>
            <Grid item>
                <SocialLink
                    type="light"
                    url="https://www.instagram.com/mondoracom/"
                    icon={faInstagram}
                />
            </Grid>
            <Grid item>
                <SocialLink
                    type="light"
                    url="https://it-it.facebook.com/mondoracom/"
                    icon={faFacebook}
                />
            </Grid>
            <Grid item>
                <SocialLink
                    type="light"
                    url="https://www.linkedin.com/company/mondora-s-p-a-/"
                    icon={faLinkedin}
                />
            </Grid>
            <Grid item>
                <SocialLink
                    type="light"
                    url="https://twitter.com/mondora"
                    icon={faTwitter}
                />
            </Grid>
            <Grid item>
                <SocialLink
                    type="light"
                    url="https://www.youtube.com/channel/UCeAVpel9SZj6WKHWLEtVlsg"
                    icon={faYoutube}
                />
            </Grid>
        </Grid>
    </Grid>
);

export default InfoAndSocials;
