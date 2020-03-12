module.exports = {
    siteMetadata: {
        title: ":mondora's website",
        description: ":mondora",
        author: "mondora-team"
    },
    plugins: [
        "gatsby-plugin-transition-link",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-styled-components",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: `gatsby-source-rss-feed`,
            options: {
                url: `https://bcalmbcorp.com/feed/`,
                name: `BcalmBcorp`
            }
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: `src/images/logo/square.png`,
                name: ":mondora",
                short_name: ":m",
                start_url: "/",
                background_color: "#663399",
                theme_color: "#663399",
                display: "minimal-ui"
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: `gatsby-source-instagram`,
            options: {
                username: `mondoracom`
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
