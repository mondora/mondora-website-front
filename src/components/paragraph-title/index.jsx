import PropTypes from "prop-types";

import styled from "styled-components";

const ParagraphTitle = styled.div`
    font-weight: 600;
    font-size: calc(18px);
    margin: 4px 0;
    line-height: 1.5;

    color: ${props =>
        props.light ? "var(--white)" : "var(--text-dark-black)"};
    text-align: ${props => (props.center ? "center" : "inherit")};
`;

ParagraphTitle.propTypes = {
    light: PropTypes.bool,
    center: PropTypes.bool
};

export default ParagraphTitle;
