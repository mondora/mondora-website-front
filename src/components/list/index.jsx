import React, { Children } from "react";
import PropTypes from "prop-types";

import { Spacer } from "../spacer";
import { Container } from "../container";

export const List = ({
    direction,
    align,
    justify,
    spacingRatio,
    children,
    ...rest
}) => (
    <Container direction={direction} align={align} justify={justify} {...rest}>
        {Children.map(children, (child, index) => (
            <Spacer
                leftRatio={
                    index !== 0 && direction === "row" ? spacingRatio : 0
                }
                topRatio={
                    index !== 0 && direction === "column" ? spacingRatio : 0
                }
            >
                {child}
            </Spacer>
        ))}
    </Container>
);

List.propTypes = {
    direction: PropTypes.oneOf(["row", "column"]),
    align: PropTypes.oneOf(["center", "flex-end", "flex-start"]),
    justify: PropTypes.oneOf(["center", "flex-end", "flex-start", "stretch"]),
    spacingRatio: PropTypes.number.isRequired
};

List.defaultProps = {
    direction: "row",
    align: "flex-start",
    justify: "flex-start",
    spacingRatio: 0
};
