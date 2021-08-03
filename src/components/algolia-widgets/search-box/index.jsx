import React from "react";

import styled from "styled-components";

import { connectSearchBox } from "react-instantsearch-dom";

const TextField = styled.input`
    margin: 8px 0;
    padding: 8px;
    height: 40px;
    border: 1px solid var(--text-dark-black);
    color: var(--text-dark-black);
`;

const SearchBox = connectSearchBox(
    ({ currentRefinement, refine, placeholder }) => (
        <form
            noValidate
            action=""
            role="search"
            onSubmit={e => e.preventDefault()}
        >
            <TextField
                type="search"
                placeholder={placeholder}
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
            />
        </form>
    )
);

export default SearchBox;
