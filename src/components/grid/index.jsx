import React, { Children } from "react";
import PropTypes from "prop-types";
import { Container, Spacer } from "./styled";

export const Grid = ({
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
    wrap
}) => (
    <Container
        direction={direction}
        align={align}
        justify={justify}
        horizontalRatio={spacingRatio}
        verticalRatio={spacingRatio}
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
        item={item}
        wrap={wrap}
    >
        {Children.toArray(children).reduce(
            (childrenWithSpacers, child, index) => {
                if (childrenWithSpacers.length !== 0) {
                    childrenWithSpacers.push(
                        <Spacer
                            key={index}
                            verticalRatio={
                                direction === "column" && spacingRatio
                                    ? spacingRatio
                                    : 0
                            }
                            horizontalRatio={
                                direction === "row" && spacingRatio
                                    ? spacingRatio
                                    : 0
                            }
                        />
                    );
                }
                childrenWithSpacers.push(child);
                return childrenWithSpacers;
            },
            []
        )}
    </Container>
);

Grid.propTypes = {
    direction: PropTypes.oneOf(["row", "column"]),
    align: PropTypes.oneOf(["center", "flex-end", "flex-start", "stretch"]),
    justify: PropTypes.oneOf(["center", "flex-end", "flex-start", "stretch"]),
    spacingRatio: PropTypes.number.isRequired,
    item: PropTypes.bool,
    wrap: PropTypes.bool,
    container: PropTypes.bool,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
};

Grid.defaultProps = {
    direction: "row",
    align: "flex-start",
    justify: "flex-start",
    spacingRatio: 0,
    wrap: true
};
