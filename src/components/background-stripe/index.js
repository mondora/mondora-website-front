import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import darkBackground from "./assets/dark_background.svg";
import lightBackground from "./assets/light_background.svg";

const BackgroundStripe = styled.div`
    width: 100%;
    padding: 32px 0;

    background-position: center;
    background-size: contain;

    ${props =>
        props.theme === darkTheme &&
        css`
            background-image: url(${darkBackground});
        `}

    ${props =>
        props.theme === lightTheme &&
        css`
            background-image: url(${lightBackground});
        `}
`;

const lightTheme = "light";
const darkTheme = "dark";

BackgroundStripe.propTypes = {
    theme: PropTypes.oneOf(lightTheme, darkTheme)
};

export default BackgroundStripe;
