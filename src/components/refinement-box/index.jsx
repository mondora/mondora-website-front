import React from "react";
import PropTypes from "prop-types";
import { Box, Flex } from "reflexbox";
import styled from "styled-components";

import ClearButton from "../algolia-widgets/clear-button";
import RefinementList from "../algolia-widgets/refinement-list";

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

const GroupTitle = styled.h4`
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
    font-size: 18px;
    margin: 0 0 16px;
`;

const RefinementBox = ({ fields }) => (
    <Container flexDirection="column" p={4} pb={0}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Title>{fields.label}</Title>
            <ClearButton label={fields.clear} />
        </Flex>

        {fields.contentfulfields.map((field, i) => (
            <Box key={i} mb={4}>
                <GroupTitle>{field.label}</GroupTitle>
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
