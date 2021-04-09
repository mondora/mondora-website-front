import React from "react";

import { connectCurrentRefinements } from "react-instantsearch-dom";

import SquareButton from "../../square-button";

const ClearButton = connectCurrentRefinements(({ items, refine, label }) => (
    <SquareButton
        onClick={() => refine(items)}
        disabled={!items.length}
        theme="light"
    >
        {label}
    </SquareButton>
));

export default ClearButton;
