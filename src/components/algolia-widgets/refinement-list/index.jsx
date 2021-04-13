import React from "react";

import { connectRefinementList } from "react-instantsearch-dom";

import RoundButton from "../../round-button";

import styled from "styled-components";

const CheckBox = styled.div`
    margin: 4px 0;
    color: var(--text-dark-black);
`;

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
                <CheckBox>
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
                </CheckBox>
            )}
        </div>
    ))
);

export default CustomRefinementList;
