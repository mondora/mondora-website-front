import React from "react";

import styled from "styled-components";

import { connectSortBy } from "react-instantsearch-dom";

const Dropdown = styled.select`
    margin: 8px 0;
    padding: 8px 8px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid var(--text-dark-black);
`;

const SortDropdown = connectSortBy(({ items, refine }) => (
    <Dropdown
        onChange={event => {
            event.preventDefault();
            refine(event.target.value);
        }}
    >
        {items.map(item => (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        ))}
    </Dropdown>
));

export default SortDropdown;
