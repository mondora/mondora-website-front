import React from "react";
import Grid from "../../grid";
import { SocialLink } from "../../social-link";
import {
    faGithub,
    faInstagram,
    faFacebook,
    faLinkedin,
    faTwitter,
    faYoutube
} from "@fortawesome/free-brands-svg-icons";

const WhereToFindUs = () => (
    <Grid item container direction="column">
        <Grid item container direction="column">
            <Grid item>
                <h1>Operative Office:</h1>
            </Grid>
            <Grid item>Via Europa 1250, 23020 Berbenno di Valtellina (SO)</Grid>
            <Grid item>Phone: +39 0342 1856 456</Grid>
        </Grid>
        <Grid item container direction="column">
            <Grid item>
                <h1>Legal Office:</h1>
            </Grid>
            <Grid item>Via Uberto Visconti di Modrone 33, 20122, Milano</Grid>
        </Grid>
        <Grid item container direction="column">
            <Grid item>
                <h1>Follow us on:</h1>
            </Grid>
            <Grid item container spacingRatio={2}>
                <Grid item>
                    <SocialLink
                        type="dark"
                        text="GitHub"
                        url="https://github.com/mondora/"
                        icon={faGithub}
                    />
                </Grid>
                <Grid item>
                    <SocialLink
                        type="dark"
                        url="https://www.instagram.com/mondoracom/"
                        icon={faInstagram}
                    />
                </Grid>
                <Grid item>
                    <SocialLink
                        type="dark"
                        url="https://it-it.facebook.com/mondoracom/"
                        icon={faFacebook}
                    />
                </Grid>
                <Grid item>
                    <SocialLink
                        type="dark"
                        url="https://www.linkedin.com/company/mondora-s-p-a-/"
                        icon={faLinkedin}
                    />
                </Grid>
                <Grid item>
                    <SocialLink
                        type="dark"
                        url="https://twitter.com/mondora"
                        icon={faTwitter}
                    />
                </Grid>
                <Grid item>
                    <SocialLink
                        type="dark"
                        url="https://www.youtube.com/channel/UCeAVpel9SZj6WKHWLEtVlsg"
                        icon={faYoutube}
                    />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default WhereToFindUs;
