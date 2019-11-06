import React from "react";

import { Flex } from "reflexbox"

const MaxWidthContainer = ({ children, ...rest }) => (
    <Flex
        mx={[16, 32, "auto"]}
        flexWrap="wrap"
        css={{
            maxWidth: "960px"
        }}
        {...rest}
    >
        {children}
    </Flex>
);

export default MaxWidthContainer;
