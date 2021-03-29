import React from "react";
import PropTypes from "prop-types";

import { RefinementList } from "react-instantsearch-dom";

import styled from "styled-components";

import SquareButton from "../square-button";

const FilterContainer = styled.div`
    background-color: var(--background-light-gray);
    width: 100%;
`;

const RefinementBox = ({ fields }) => (
    <FilterContainer>
        {fields.map((field, i) => (
            <div key={i}>
                {field.label}
                <RefinementList attribute={field.field} />
            </div>
        ))}
        <SquareButton theme="light">{"Clear filters"}</SquareButton>
        <SquareButton theme="primary">{"Apply"}</SquareButton>
    </FilterContainer>
);

RefinementBox.propTypes = {
    fields: PropTypes.array
};

export default RefinementBox;
