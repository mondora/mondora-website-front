// const env = require("@mondora/env").default;

// const nodeEnv = env("NODE_ENV", { default: "development" });

// require("dotenv").config({
//     path: `${__dirname}/.env.${nodeEnv}`
// });

// const contentfulSpaceId = env("CONTENTFUL_SPACE_ID", { required: true });
// const contentfulAccessToken = env("CONTENTFUL_ACCESS_TOKEN", {
//     required: true
// });

module.exports = {
    siteMetadata: {
        title: ":mondora's website",
        // TODO: write a decent description.
        description: ":mondora",
        author: "mondora-team"
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-styled-components",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: ":mondora",
                short_name: ":m",
                start_url: "/",
                background_color: "#663399",
                theme_color: "#663399",
                display: "minimal-ui"
            }
        }
        // {
        //     resolve: `gatsby-source-contentful`,
        //     options: {
        //         spaceId: process.env.CONTENTFUL_SPACE_ID,
        //         accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
        //     }
        // }
    ]
};
