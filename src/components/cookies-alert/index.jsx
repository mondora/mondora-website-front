import React from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import { Flex, Box } from "reflexbox";

import Subtitle from "../subtitle";
import SquareButton from "../square-button";

export const Container = styled.div`
    opacity: ${props => (props.show ? 1 : 0)};

    background: var(--background-light-gray);
    position: fixed;
    left: 24px;
    bottom: 24px;
    max-width: 500px;

    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.25);
    transition: opacity 0.4s ease;

    ${props =>
        !props.show &&
        css`
            display: none;
        `}
`;

const CookiesAlert = ({ show, onHide }) => (
    <Container show={show}>
        <Flex margin={3} flexDirection="column">
            <Box m={1}>
                <Subtitle>
                    {
                        "Questo sito fa uso di cookie per migliorare l’esperienza di navigazione degli utenti e per raccogliere informazioni sull’utilizzo del sito stesso. Proseguendo nella navigazione si accetta l’uso dei cookie; in caso contrario è possibile abbandonare il sito."
                    }
                </Subtitle>
            </Box>
            <Box m={1}>
                <SquareButton onClick={onHide}>
                    {"Continua la navigazione"}
                </SquareButton>
            </Box>
        </Flex>
    </Container>
);

CookiesAlert.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
};

export default CookiesAlert;
