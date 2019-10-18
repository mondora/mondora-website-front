import styled from "styled-components";
import GatsbyLink from "gatsby-link";
import PropTypes from "prop-types";

const InnerLink = styled(GatsbyLink)`
    text-decoration: none;
    color: var(--white);
`;

InnerLink.propTypes = {
    to: PropTypes.string
};

export default InnerLink;
