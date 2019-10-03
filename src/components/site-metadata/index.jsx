import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const SiteMetadata = ({ post }) => {
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    description
                    siteUrl
                }
            }
        }
    `);

    const defaults = data.site.siteMetadata;

    if (defaults.siteUrl === "" && typeof window !== "undefined") {
        defaults.siteUrl = window.location.origin;
    }

    if (defaults.siteUrl === "") {
        console.error("Please set a baseUrl in your site metadata!");
        return null;
    }

    const title = defaults.title;
    const description = defaults.description;
    const url = new URL(defaults.siteUrl);

    return (
        <Helmet>
            <title>{title}</title>
            <link rel="canonical" href={url} />
            <meta name="description" content={description} />
        </Helmet>
    );
};

export default SiteMetadata;
