import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Box, Flex } from "reflexbox";

import ParagraphTitle from "../paragraph-title";

import NumberOfResults from "../algolia-widgets/results-number";
import SortDropdown from "../algolia-widgets/sort-dropdown";
import SearchBox from "../algolia-widgets/search-box";

const SearchContainer = styled(Box)`
    text-align: right;
`;

const FilteringControls = ({ sorting, search }) => (
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
        <Box width={[1, 1]} mt={2} mb={4}>
            <NumberOfResults />
        </Box>
    </Flex>
);

FilteringControls.propTypes = {
    sorting: PropTypes.object,
    search: PropTypes.object
};

export default FilteringControls;
