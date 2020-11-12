import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../../components/layout";

import PageContent from "../../components/page-content";
import PageMetadata from "../../components/page-metadata";
import PageTitle from "../../components/page-title";

export const pageQuery = graphql`
    query($slug: String!) {
        contentfulSimplePage(slug: { eq: $slug }) {
            pageName
            metaTitle
            metaDescription {
                metaDescription
            }
            metaRobots
            content {
                childMarkdownRemark {
                    htmlAst
                }
            }
        }
    }
`;

const SimplePage = ({ data: { contentfulSimplePage } }) => {
    return (
        <Layout>
            <PageMetadata
                title={contentfulSimplePage.metaTitle}
                description={
                    contentfulSimplePage.metaDescription.metaDescription
                }
                disableRobots={contentfulSimplePage.metaRobots}
            />
            <PageTitle>{contentfulSimplePage.pageName}</PageTitle>
            <PageContent>
                {contentfulSimplePage.content.childMarkdownRemark.htmlAst}
            </PageContent>
        </Layout>
    );
};

SimplePage.propTypes = {
    data: PropTypes.shape({
        contentfulSimplePage: PropTypes.shape({
            pageName: PropTypes.string.isRequired,
            metaTitle: PropTypes.string,
            metaRobots: PropTypes.bool,
            metaDescription: PropTypes.object,
            content: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
};

export default SimplePage;
