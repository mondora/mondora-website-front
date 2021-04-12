import React from "react";

import { connectSortBy } from "react-instantsearch-dom";

const SortDropdown = connectSortBy(({ items, refine }) => (
    <select
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
    </select>
));

export default SortDropdown;
