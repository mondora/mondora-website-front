import React from "react";
import PropTypes from "prop-types";

import {
    RefinementList,
    connectCurrentRefinements
} from "react-instantsearch-dom";

import styled from "styled-components";

import SquareButton from "../square-button";
import Title from "../title";

const FilterContainer = styled.div`
    background-color: var(--background-light-gray);
    width: 100%;
`;

const ClearButton = connectCurrentRefinements(({ items, refine, label }) => (
    <SquareButton
        onClick={() => refine(items)}
        disabled={!items.length}
        theme="light"
    >
        {label}
    </SquareButton>
));

const RefinementBox = ({ fields }) => (
    <FilterContainer>
        <Title>{fields.label}</Title>
        {fields.contentfulfields.map((field, i) => (
            <div key={i}>
                {field.label}
                <RefinementList attribute={field.field} />
            </div>
        ))}
        <ClearButton label={fields.clear} />
        <SquareButton theme="primary">{fields.apply}</SquareButton>
    </FilterContainer>
);

RefinementBox.propTypes = {
    fields: PropTypes.object
};

export default RefinementBox;
