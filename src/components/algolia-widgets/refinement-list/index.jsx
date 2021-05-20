import React from "react";

import { connectRefinementList } from "react-instantsearch-dom";

import RoundButton from "../../round-button";

import styled, { css } from "styled-components";

const CheckBox = styled.div`
    margin: 4px 0;
    color: var(--text-dark-black);
    ${props =>
        props.appearance
            ? css`
                  background-color: var(--background-light-gray);
                  margin: 8px 0;
                  border-radius: 4px;
                  padding: 8px;
                  width: 240px;
                  display: flex;
                  flex-direction: row-reverse;
                  justify-content: space-between;
                  align-items: center;
              `
            : css`
                  margin: 4px 0;
              `}
`;

const CustomRefinementList = connectRefinementList(
    ({ items, refine, type, appearance }) =>
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
                    <CheckBox appearance={appearance}>
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
