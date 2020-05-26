const Promise = require('bluebird')
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('src/templates/ProductPage/index.js')
    resolve(
      graphql(
        `
          {
            allShopifyProduct {
              edges {
                node {
                  handle
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.allShopifyProduct.edges.forEach(edge => {
          createPage({
            path: `/product/${edge.node.handle}/`,
            component: productPageTemplate,
            context: {
              handle: node.handle,
            },
          })
        })
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: { fs: 'empty' },
  })
}
