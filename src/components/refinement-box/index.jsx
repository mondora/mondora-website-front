import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import Title from "../title";
import ParagraphTitle from "../paragraph-title";

import ClearButton from "../algolia-widgets/clear-button";
import CustomRefinementList from "../algolia-widgets/refinement-list";
import { Flex } from "reflexbox";

const FilterContainer = styled.div`
    background-color: var(--white);
    padding: 16px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const RefinementBox = ({ fields }) => (
    <FilterContainer>
        <Flex flexDirection="row" justifyContent="space-between">
            <Title>{fields.label}</Title>
            <ClearButton label={fields.clear} />
        </Flex>

        {fields.contentfulfields.map((field, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
                <ParagraphTitle>{field.label}</ParagraphTitle>
                <CustomRefinementList
                    limit={20}
                    type={field.type}
                    attribute={field.field}
                />
            </div>
        ))}
    </FilterContainer>
);

RefinementBox.propTypes = {
    fields: PropTypes.object
};

export default RefinementBox;
