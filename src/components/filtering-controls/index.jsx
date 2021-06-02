import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Box, Flex } from "reflexbox";

import ParagraphTitle from "../paragraph-title";
import Button from "../button";
import Hidden from "../hidden";
import FeatherIcon from "../feather-icon";

import NumberOfResults from "../algolia-widgets/results-number";
import SortDropdown from "../algolia-widgets/sort-dropdown";
import SearchBox from "../algolia-widgets/search-box";

const SearchContainer = styled(Box)`
    text-align: right;
`;

const FilteringControls = ({ sorting, search, openFilters }) => (
    <Flex flexWrap="wrap" justify-content="space-between">
        <Box width={[1 / 2]} mb={2}>
            <ParagraphTitle>{sorting.label}</ParagraphTitle>
            <SortDropdown
                defaultRefinement="mondora_resources_en"
                items={sorting.contentfulfields}
            />
        </Box>
        <SearchContainer width={[1 / 2]} mb={2}>
            <ParagraphTitle>{search.label}</ParagraphTitle>
            <SearchBox placeholder={search.value} />
        </SearchContainer>
        <Box width={[1 / 2, 1]} mt={4} mb={3}>
            <NumberOfResults />
        </Box>
        <Box width={[1 / 2, 0]} mt={[2, 0]} mb={[4, 0]} textAlign={"right"}>
            <Hidden xsUp={true}>
                <Button theme={"light"} onClick={openFilters}>
                    <Flex width={"72px"} justifyContent={"space-between"}>
                        {"Filter "}
                        <FeatherIcon
                            align-self={"end"}
                            size={16}
                            fill={true}
                            name="filter"
                        />
                    </Flex>
                </Button>
            </Hidden>
        </Box>
    </Flex>
);

FilteringControls.propTypes = {
    sorting: PropTypes.object,
    search: PropTypes.object,
    openFilters: PropTypes.func
};

export default FilteringControls;
