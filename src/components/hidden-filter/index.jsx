import React, { useState } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import ParagraphTitle from "../paragraph-title";

import CustomRefinementList from "../algolia-widgets/refinement-list";
import { Flex } from "reflexbox";
import FeatherIcon from "../feather-icon";

const HiddenFields = styled.div`
    max-height: ${props => (props.open ? "50vh" : 0)};
    transition: all ease 0.5s;
    overflow: hidden;
`;

const Divider = styled.div`
    height: 0;
    width: 100%;
    margin: 8px 0 16px 0;
    border: 1px solid var(--black);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const HiddenFilter = ({ field }) => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ overflow: "hidden" }}>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                pr={2}
                onClick={() => setOpen(!open)}
            >
                <ParagraphTitle>{field.label}</ParagraphTitle>
                <FeatherIcon
                    size={24}
                    name={open ? "chevron-up" : "chevron-down"}
                />
            </Flex>
            <Divider />
            <HiddenFields open={open}>
                <CustomRefinementList
                    limit={20}
                    type={field.type}
                    attribute={field.field}
                    appearance={"mobile"}
                />
            </HiddenFields>
        </div>
    );
};

HiddenFilter.propTypes = {
    field: PropTypes.object
};

export default HiddenFilter;
