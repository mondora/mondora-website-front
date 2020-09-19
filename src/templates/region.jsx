import React from "react";

import PropTypes from "prop-types";

import { graphql } from "gatsby";

const RegionTemplate = ({ data }) => <div>{data.contentfulRegion.name}</div>;

RegionTemplate.propTypes = {
    data: PropTypes.object
};

export default RegionTemplate;

export const query = graphql`
    query($slug: String!) {
        contentfulRegion(slug: { eq: $slug }) {
            name
        }
    }
`;
