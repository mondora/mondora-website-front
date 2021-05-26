import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import PropTypes from "prop-types";

import Checkbox from "../../checkbox";
import Tag from "../../tag";

const RefinementList = connectRefinementList(
    ({ items, refine, type, appearance }) => {
        return items
            .sort((a, b) => a.label.localeCompare(b.label))
            .map(({ count, isRefined, label, value }) => (
                <div
                    key={label}
                    onClick={event => {
                        event.preventDefault();
                        refine(value);
                    }}
                >
                    {(() => {
                        switch (type) {
                            case "chip":
                                return (
                                    <Tag theme={isRefined ? "primary" : "gray"}>
                                        {label}
                                    </Tag>
                                );
                            default:
                                return (
                                    <Checkbox
                                        appearance={appearance}
                                        checked={isRefined}
                                        label={`${label} (${count})`}
                                        onChange={event =>
                                            event.preventDefault()
                                        }
                                        value={label}
                                    />
                                );
                        }
                    })()}
                </div>
            ));
    }
);

RefinementList.propTypes = {
    items: PropTypes.shape({
        label: PropTypes.string,
        isRefined: PropTypes.bool,
        value: PropTypes.string,
        count: PropTypes.number
    }),
    refine: PropTypes.func,
    type: PropTypes.string,
    appearance: PropTypes.string
};

export default RefinementList;
