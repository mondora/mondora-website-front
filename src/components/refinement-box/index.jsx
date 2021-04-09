import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import Title from "../title";
import ParagraphTitle from "../paragraph-title";

import ClearButton from "../algolia-widgets/clear-button"
import CustomRefinementList from "../algolia-widgets/refinement-list"

const FilterContainer = styled.div`
    background-color: var(--white);
    width: 100%;
`;

const RefinementBox = ({ fields }) => (
    <FilterContainer>
        <Title>{fields.label}</Title>
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
        <ClearButton label={fields.clear} />
    </FilterContainer>
);

RefinementBox.propTypes = {
    fields: PropTypes.object
};

export default RefinementBox;
