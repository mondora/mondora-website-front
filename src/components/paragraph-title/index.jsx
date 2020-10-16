import PropTypes from "prop-types";

import styled from "styled-components";

const ParagraphTitle = styled.div`
    font-weight: 600;
    font-size: calc(18px);
    margin: 4px 0;
    line-height: 1.5;

    @media (max-width: 768px) {
        text-align: ${props => (props.center[0] ? "center" : "inherit")};
    }

    color: ${props =>
        props.light ? "var(--white)" : "var(--text-dark-black)"};
    text-align: ${props => (props.center[1] ? "center" : "inherit")};
`;

ParagraphTitle.defaultProps = {
    center: [false, false]
}

ParagraphTitle.propTypes = {
    light: PropTypes.bool,
    center: PropTypes.array
};

export default ParagraphTitle;
