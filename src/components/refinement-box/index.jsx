import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import ParagraphTitle from "../paragraph-title";

import ClearButton from "../algolia-widgets/clear-button";
import RefinementList from "../algolia-widgets/refinement-list";
import { Box, Flex } from "reflexbox";

const Container = styled(Flex)`
    background-color: var(--white);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h3`
    color: var(--text-dark-black);
    font-size: 24px;
    font-weight: 500;
    margin: 0;
`;

const RefinementBox = ({ fields }) => (
    <Container flexDirection="column" p={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Title>{fields.label}</Title>
            <ClearButton label={fields.clear} />
        </Flex>

        {fields.contentfulfields.map((field, i) => (
            <Box key={i} mb={3}>
                <ParagraphTitle>{field.label}</ParagraphTitle>
                <RefinementList
                    limit={50}
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
