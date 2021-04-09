import React from "react";
import PropTypes from "prop-types";

import {
    connectCurrentRefinements,
    connectRefinementList
} from "react-instantsearch-dom";

import styled from "styled-components";

import SquareButton from "../square-button";
import Title from "../title";
import ParagraphTitle from "../paragraph-title";
import RoundButton from "../round-button";

const FilterContainer = styled.div`
    background-color: var(--white);
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

const CustomRefinementList = connectRefinementList(({ items, refine, type }) =>
    items.map(item => (
        <div
            key={item.label}
            style={{
                fontWeight: item.isRefined ? "bold" : ""
            }}
            onClick={event => {
                event.preventDefault();
                refine(item.value);
            }}
        >
            {type === "chip" ? (
                <RoundButton theme={item.isRefined ? "yellow" : "gray"}>
                    {item.label}
                </RoundButton>
            ) : (
                <>
                    <input
                        type="checkbox"
                        name={item.label}
                        checked={item.isRefined}
                        onChange={event => event.preventDefault()}
                    />
                    <label htmlFor={item.label}>
                        {item.label}
                        {" ("}
                        {item.count}
                        {")"}
                    </label>
                </>
            )}
        </div>
    ))
);

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
