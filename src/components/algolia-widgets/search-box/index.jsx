import React from "react";

import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = connectSearchBox(
    ({ currentRefinement, refine, placeholder }) => (
        <form noValidate action="" role="search">
            <input
                type="search"
                placeholder={placeholder}
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
            />
        </form>
    )
);

export default SearchBox;
