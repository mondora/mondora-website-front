import React from "react";
import PropTypes from "prop-types";

import {
    RefinementList,
    connectCurrentRefinements
} from "react-instantsearch-dom";

import styled from "styled-components";

import SquareButton from "../square-button";

const FilterContainer = styled.div`
    background-color: var(--background-light-gray);
    width: 100%;
`;

const ClearButton = connectCurrentRefinements(({ items, refine }) => (
    <SquareButton
        onClick={() => refine(items)}
        disabled={!items.length}
        theme="light"
    >
        {"Clear filters"}
    </SquareButton>
));

const RefinementBox = ({ fields }) => (
    <FilterContainer>
        {fields.map((field, i) => (
            <div key={i}>
                {field.label}
                <RefinementList attribute={field.field} />
            </div>
        ))}
        <ClearButton />
        <SquareButton theme="primary">{"Apply"}</SquareButton>
    </FilterContainer>
);

RefinementBox.propTypes = {
    fields: PropTypes.array
};

export default RefinementBox;
