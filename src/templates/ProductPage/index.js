import React from 'react'
import { graphql } from 'gatsby'
import SEO from '~/components/seo.js'
import get from 'lodash/get'
import ProductAttributes from '../../components/ProductAttributes'
import Layout from '../../components/Layout'

// import ProductForm from '~/components/ProductForm'

class ProductPageTemplate extends React.PureComponent {
render() {
    const productInfo = get(this, 'props.data.shopifyProduct')      
    const data = productInfo
    const slug = data.slug
    const image = get(data, 'images.originalSrc')
    const sizes = get(data, 'images.localFile.childImageSharp.sizes')
    const product = {
      ...data,
      id: data.id,
      image,
      images: data.images,
      header: data.title,
      variants: data.variants,
      sku: data.sku,
    }

    if (!sizes) return console.log('No Products found')

    return (
      <Layout location={this.props.location}>
        <SEO title={slug} />
        <ProductAttributes {...product} />
      </Layout>
    )
  }
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($handle: String!) {
    allShopifyProduct(filter: {handle: {eq: $handle}}) {
      edges {
        node {
          id
          title
          handle
          productType
          description
          descriptionHtml
          shopifyId
          options {
            id
            name
            values
          }
          variants {
            id
            title
            price
            availableForSale
            shopifyId
            selectedOptions {
              name
              value
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            originalSrc
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
