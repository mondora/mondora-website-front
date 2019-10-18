import styled from "styled-components";
import PropTypes from "prop-types";
import MondoraMiniLogoBlack from "../assets/mondora-mini-logo-black.svg";
import MondoraMiniLogoWhite from "../assets/mondora-mini-logo-white.svg";

const MiniLogo = styled.div`
    width: 56px;
    height: 56px;
    background: url(${props =>
        props.dark ? MondoraMiniLogoBlack : MondoraMiniLogoWhite});
    background-repeat: no-repeat;
`;

MiniLogo.propTypes = {
    dark: PropTypes.bool
};

export default MiniLogo;
