import React from "react";

import { connectSortBy } from "react-instantsearch-dom";

import DropDown from "../../dropdown";

const SortDropdown = connectSortBy(({ items, refine }) => (
    <DropDown
        onSelect={item => refine(item.value)}
        items={items}
        width={"120px"}
    />
));

export default SortDropdown;
