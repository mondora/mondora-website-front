import React from "react";

import { connectRefinementList } from "react-instantsearch-dom";
import CheckBox from "../../checkbox";

import Tag from "../../tag";

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
                    <Tag theme={item.isRefined ? "primary" : "gray"}>
                        {item.label}
                    </Tag>
                ) : (
                    <CheckBox
                        appearance={appearance}
                        label={`${item.label} (${item.count})`}
                        checked={item.isRefined}
                        onChange={event => event.preventDefault()}
                    />
                )}
            </div>
        ))
);

export default CustomRefinementList;
