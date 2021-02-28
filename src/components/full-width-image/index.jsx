import PropTypes from "prop-types";

import styled from "styled-components";
import Image from "gatsby-image";

const FullWidthImage = styled(Image)`
    margin: ${props => props.margin};
    width: 100%;
`;

FullWidthImage.propTypes = {
    margin: PropTypes.string
};

export default FullWidthImage;
