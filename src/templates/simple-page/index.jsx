import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import Content from "../../components/content";
import MaxWidthContainer from "../../components/max-width-container";
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
            content {
                childContentfulRichText {
                    html
                }
            }
        }
    }
`;

const BlogPost = ({ data: { contentfulSimplePage } }) => {
    return (
        <Layout>
            <PageMetadata
                title={contentfulSimplePage.metaTitle}
                description={
                    contentfulSimplePage.metaDescription.metaDescription
                }
            />
            <MaxWidthContainer width="100" justifyContent="center">
                <PageTitle>{contentfulSimplePage.pageName}</PageTitle>
            </MaxWidthContainer>
            <MaxWidthContainer width="100" justifyContent="center">
                <Content
                    html={
                        contentfulSimplePage.content.childContentfulRichText
                            .html
                    }
                />
            </MaxWidthContainer>
        </Layout>
    );
};

BlogPost.propTypes = {
    data: PropTypes.shape({
        contentfulSimplePage: PropTypes.shape({
            pageName: PropTypes.string.isRequired,
            metaTitle: PropTypes.string,
            metaDescription: PropTypes.object,
            content: PropTypes.object.isRequired
        }).isRequired
    }).isRequired
};

export default BlogPost;
