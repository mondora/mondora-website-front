import React from "react";
import PropTypes from "prop-types";
import { Container } from "./styled";

const Grid = ({
    direction,
    align,
    justify,
    spacingRatio,
    children,
    xs,
    sm,
    md,
    lg,
    xl,
    item,
    container,
    wrap,
    grow,
    ...rest
}) => (
    <Container
        direction={direction}
        align={align}
        justify={justify}
        spacingRatio={spacingRatio}
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
        item={item}
        container={container}
        wrap={wrap}
        grow={grow}
        {...rest}
    >
        {children}
    </Container>
);

Grid.propTypes = {
    direction: PropTypes.oneOf(["row", "column"]),
    align: PropTypes.oneOf(["center", "flex-end", "flex-start", "stretch"]),
    justify: PropTypes.oneOf([
        "center",
        "flex-end",
        "flex-start",
        "stretch",
        "space-evenly",
        "space-between"
    ]),
    spacingRatio: PropTypes.number.isRequired,
    item: PropTypes.bool,
    wrap: PropTypes.oneOf(["wrap", "nowrap"]),
    container: PropTypes.bool,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    grow: PropTypes.number
};

Grid.defaultProps = {
    direction: "row",
    align: "flex-start",
    justify: "flex-start",
    spacingRatio: 0,
    wrap: "wrap"
};

export default Grid;
