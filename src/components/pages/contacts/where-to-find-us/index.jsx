import React from "react";

import { Flex } from "reflexbox";

import Title from "../../../title";
import Subtitle from "../../../subtitle";

const WhereToFindUs = () => (
    <Flex flexDirection="column" backgroundColor="white">
        <Title>{"Operative Office:"}</Title>
        <Subtitle>
            {"Via Europa 1250, 23020 Berbenno di Valtellina (SO)"}
        </Subtitle>

        <Title>{"Legal Office:"}</Title>
        <Subtitle>
            {"Via Uberto Visconti di Modrone 33, 20122, Milano"}
        </Subtitle>
    </Flex>
);

export default WhereToFindUs;
