import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const PageMetadata = ({ title, description, disableRobots, locale }) => {
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    description
                    robots
                    locale
                }
            }
        }
    `);

    const defaults = data.site.siteMetadata;
    const seo = {
        title: title || defaults.title,
        description: description || defaults.description,
        robots: disableRobots ? "none" : defaults.robots,
        locale: locale || defaults.locale
    };

    return (
        <Helmet
            htmlAttributes={{
                lang: seo.locale
            }}
        >
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="robots" content={seo.robots} />
        </Helmet>
    );
};

PageMetadata.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    disableRobots: PropTypes.bool,
    locale: PropTypes.string
};

export default PageMetadata;
