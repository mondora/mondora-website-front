require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
    siteMetadata: {
        siteUrl: "https://mondora.com",
        title: ":mondora - Building software, creating benefit",
        description:
            "Software and advisory company specialized in custom cloud solutions. Our aim is to create benefit for all stakeholders by designing and building software solutions that maximise positive impact.",
        author: "mondora-team",
        robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        locale: "en"
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
                url: "https://medium.com/feed/b-calm-and-b-corp",
                name: "BcalmBcorp"
            }
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/logo-square.png",
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
            resolve: "gatsby-plugin-sitemap",
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: process.env.GOOGLE_TAGMANAGER_ID
            }
        },
        {
            resolve: "gatsby-plugin-google-fonts",
            options: {
                fonts: [
                    "playfair display: 400,700",
                    "source sans pro:400,400i,600,600i"
                ],
                display: "swap"
            }
        },
        {
            resolve: "gatsby-source-contentful",
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
            }
        },
        {
            resolve: "gatsby-source-buzzsprout",
            options: {
                token: process.env.BUZZRPROUT_TOKEN,
                podcastId: process.env.BUZZSPROUT_PODCAST_ID
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                commonmark: true,
                footnotes: true,
                pedantic: true,
                gfm: true,
                plugins: [
                    {
                        resolve: "gatsby-remark-embed-video",
                        options: {
                            width: 1136,
                            ratio: 1.77,
                            related: false,
                            noIframeBorder: true,
                            urlOverrides: [
                                {
                                    id: "youtube",
                                    embedURL: videoId =>
                                        `https://www.youtube-nocookie.com/embed/${videoId}`
                                }
                            ],
                            containerClass: "embedVideo-container"
                        }
                    },
                    {
                        resolve: "gatsby-remark-images-contentful",
                        options: {
                            maxWidth: 1136,
                            linkImagesToOriginal: false,
                            withWebp: true
                        }
                    },
                    "gatsby-remark-responsive-iframe"
                ]
            }
        }
    ]
};
