import React from "react";

import { Flex, Box } from "reflexbox";

const MaxWidthContainer = ({ children, ...rest }) => (
    <Flex
        mx={[16, 32, "auto"]}
        px={[0, 0, 32]}
        flexWrap="wrap"
        maxWidth={1200}
        {...rest}
    >
        {children}
    </Flex>
);

export default MaxWidthContainer;
