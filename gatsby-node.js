const path = require("path");

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
        const regionTemplate = path.resolve("src/templates/region.jsx");
        resolve(
            graphql(`
                {
                    allContentfulRegion(limit: 100) {
                        edges {
                            node {
                                id
                                name
                                slug
                            }
                        }
                    }
                    allContentfulSimplePage {
                        nodes {
                            slug
                        }
                    }
                }
            `).then(result => {
                if (result.errors) {
                    reject(result.errors);
                }
                result.data.allContentfulRegion.edges.forEach(edge => {
                    createPage({
                        path: "regions/" + edge.node.slug,
                        component: regionTemplate,
                        context: {
                            slug: edge.node.slug
                        }
                    });
                });
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
                return;
            })
        );
    });

};
