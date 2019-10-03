module.exports = {
    siteMetadata: {
        siteUrl: "https://mondora.com",
        title: ":mondora - building software, creating benefit",
        description:
            "Our aim is to create benefit for all stakeholders by designing and building software solutions that maximise positive impact. We support humans and nature with projects that benefit the community and land.",
        author: "mondora-team"
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        {
            resolve: `gatsby-source-instagram`,
            options: {
                username: `mondoracom`
            }
        },
        "gatsby-plugin-styled-components",
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
                icon: `src/images/logo_mondora_high.png`,
                name: ":mondora",
                short_name: ":m",
                start_url: "/",
                background_color: "#f2f2f2",
                theme_color: "#ffda03",
                display: "minimal-ui"
            }
        }
    ]
};
