import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import Title from "../title";
import ParagraphTitle from "../paragraph-title";

import ClearButton from "../algolia-widgets/clear-button";
import CustomRefinementList from "../algolia-widgets/refinement-list";
import { Box, Flex } from "reflexbox";

const Container = styled(Flex)`
    background-color: var(--white);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const RefinementBox = ({ fields }) => (
    <Container flexDirection="column" p={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={3}>
            <Title>{fields.label}</Title>
            <ClearButton label={fields.clear} />
        </Flex>

        {fields.contentfulfields.map((field, i) => (
            <Box key={i} mb={3}>
                <ParagraphTitle>{field.label}</ParagraphTitle>
                <CustomRefinementList
                    limit={20}
                    type={field.type}
                    attribute={field.field}
                />
            </Box>
        ))}
    </Container>
);

RefinementBox.propTypes = {
    fields: PropTypes.object
};

export default RefinementBox;
