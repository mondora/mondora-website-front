import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Grid from "../grid";
import DarkBackground from "../layout/assets/dark_background.svg";
import LightBackground from "../layout/assets/light_background.svg";

const BackgroundDecoratedGrid = styled(Grid)`
    background-position: center;
    background-size: cover;
    background-image: ${props =>
        props.dark
            ? css`url(${DarkBackground})`
            : css`url(${LightBackground})`};
`;

BackgroundDecoratedGrid.propTypes = {
    dark: PropTypes.bool
};

export default BackgroundDecoratedGrid;
