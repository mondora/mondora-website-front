const path = require("path");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
    const result = await graphql(`
        query {
            allContentfulSimplePage {
                nodes {
                    slug
                }
            }
        }
    `);

    result.data.allContentfulSimplePage.nodes.forEach(node => {
        const { slug } = node;
        createPage({
            path: `/${slug}/`,
            component: path.resolve("./src/templates/simple-page/index.jsx"),
            context: {
                slug
            }
        });
    });
};
