import React from "react";
import PropTypes from "prop-types";

import feather from "feather-icons";
import styled from "styled-components";

const Container = styled.div`
    display: flex;

    & > svg {
        fill: ${props => (props.fill ? "currentColor" : "none")};
    }
`;

/**
 * Wrapper component for [Feather](https://feather.netlify.com) icons.
 */
const FeatherIcon = ({ name, color, size, fill, stroke }) => {
    const icon = feather.icons[name];
    if (!icon) {
        return null;
    }

    return (
        <Container
            fill={fill}
            dangerouslySetInnerHTML={{
                __html: icon.toSvg({
                    color,
                    stroke,
                    width: size,
                    height: size
                })
            }}
        />
    );
};

FeatherIcon.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    fill: PropTypes.bool,
    /** Color of the outline path. If provided will override `color` prop. */
    stroke: PropTypes.string
};

FeatherIcon.defaultProps = {
    stroke: "currentColor"
};

export default FeatherIcon;
