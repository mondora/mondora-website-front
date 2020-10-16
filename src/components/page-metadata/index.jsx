import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const PageMetadata = ({ title, description }) => {
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `);

    const defaults = data.site.siteMetadata;
    const seo = {
        title: title || defaults.title,
        description: description || defaults.description
    };

    return (
        <Helmet>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
        </Helmet>
    );
};

PageMetadata.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};

export default PageMetadata;
