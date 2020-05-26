import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Header} from 'semantic-ui-react'
import SEO from '~/components/seo'
import ProductList from '~/components/ProductList'
import Layout from '~/components/Layout'
// import StoreContext from '~/components/Context/StoreContext.js'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
        }
      }
      allShopifyProduct(
        sort: {
          fields: [createdAt]
          order: DESC
        }
      ) {
        edges {
          node {
            id
            title
            handle
            createdAt
            images {
              id
              originalSrc
              localFile {
                childImageSharp {
                  sizes(maxWidth: 400) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
            variants {
              price
            }
          }
        }
      }
    }
  `)
  
  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allShopifyProduct.edges')
  const filterProductsWithoutImages = products.filter(v => v.node.images.originalSrc)
  return (  
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          margin: '0 auto'
        }}
      >
        <Header.Content
          style={{
            margin: '0 auto',
            width: '60%'
          }}
        >
        </Header.Content>
      </Header>
      <ProductList products={filterProductsWithoutImages} />
    </Layout>
  )
}

export default StoreIndex
