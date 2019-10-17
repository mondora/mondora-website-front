import React from "react";

import { Container, Circle, Line } from "./styled";

const Divider = ({
    above = false,
    below = true,
    height = "100%",
    hideOnMobile = false
}) => {
    return (
        <Container height={height} hideOnMobile={hideOnMobile}>
            <Circle show={above} />
            <Line />
            <Circle show={below} />
        </Container>
    );
};

export default Divider;
