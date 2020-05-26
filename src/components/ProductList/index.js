import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const mapProductsToItems = products => {
  products.map(({node: {title, id, images, variants}}) => {
    const price = variants.price || null
    return {
      as: Link,
      to: '/product/${handle}',
      childKey: id,
      image: (
        <Image>
          <Img sizes={images.localFile.childImageSharp.sizes} alt={title}/>
        </Image>
      ),
      header: title,
      variants: <Card.Variants style={{color: 'dimgray'}}>{price}</Card.Variants>,
    }
  })
}

export default ({products}) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)
