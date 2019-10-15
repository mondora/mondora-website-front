import React from "react";
import PropTypes from "prop-types";

import Grid from "../../components/grid";
import SquareButton from "../square-button";

import { Container } from "./styled";

const CookiesAlert = ({ show, onHide }) => (
    <Container show={show}>
        <Grid container direction="column" spacingRatio={2}>
            <Grid item xs={12}>
                Questo sito fa uso di cookie per migliorare l’esperienza di
                navigazione degli utenti e per raccogliere informazioni
                sull’utilizzo del sito stesso. Proseguendo nella navigazione si
                accetta l’uso dei cookie; in caso contrario è possibile
                abbandonare il sito.
            </Grid>
            <Grid item ms={12} justify="flex-end">
                <SquareButton onClick={onHide}>OK</SquareButton>
            </Grid>
        </Grid>
    </Container>
);

CookiesAlert.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
};

export default CookiesAlert;
