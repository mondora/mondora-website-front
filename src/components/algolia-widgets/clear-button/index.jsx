import React from "react";

import { connectCurrentRefinements } from "react-instantsearch-dom";

import Button from "../../button";

const ClearButton = connectCurrentRefinements(({ items, refine, label }) => (
    <Button
        onClick={() => refine(items)}
        disabled={!items.length}
        theme="light"
    >
        {label}
    </Button>
));

export default ClearButton;
