require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
    siteMetadata: {
        siteUrl: "https://mondora.com",
        title: ":mondora - Building software, creating benefit",
        description:
            "Software and advisory company specialized in custom cloud solutions. Our aim is to create benefit for all stakeholders by designing and building software solutions that maximise positive impact.",
        author: "mondora-team"
    },
    plugins: [
        "gatsby-plugin-transition-link",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-styled-components",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-source-rss-feed",
            options: {
                url: "https://bcalmbcorp.com/feed/",
                name: "BcalmBcorp"
            }
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/logo/square.png",
                name: ":mondora",
                short_name: ":m",
                start_url: "/",
                background_color: "#f2f2f2",
                theme_color: "#ffda01",
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
            resolve: "gatsby-source-instagram",
            options: {
                username: "mondoracom"
            }
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                exclude: ["/meet-the-team/"]
            }
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: process.env.GOOGLE_TAGMANAGER_ID
            }
        }
    ]
};
