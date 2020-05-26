// require('regenerator-runtime/runtime')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

//TODO: find out how to implement sdk with shopify. Also, Gateway.
const shopifyGateway = require(`@sshopify-buy`).gateway

const Shopify = shopifyGateway({
  access_token:
    process.env.SHOPIFY_ACCESS_TOKEN ||
    'b77c00e8a3a062eee65b3eab68b524ac',
})

/*
const Shopify = ShopifyGateway({
  password: 'iU44RWxeik',
  login: 'ShopifyGateway',
  
})
*/
//? we create contanst that hold the product properties & some data
const getProducts = () => Shopify.Products.With('main_image').All()
//? I assume this gets the products nodes. meaning all properties are here.
const getProductById = id => Shopify.Products.With('main_image').Get(id)
//? This gets the product's id.
const addToCart = (cartId, productId, quantity) =>
  Shopify.Cart(cartId).AddProduct(productId, quantity)
//? Gets the product's is, quantity, and cartid data. 
const getCartItems = id => Shopify.Cart(id).Items()
//? Gets all the cartid listed as items
const removeFromCart = (productId, cartId) =>
  Shopify.Cart(cartId).RemoveItem(productId)
//? Removes the items on the cart list
const checkoutCart = (cartId, customer, billing) =>
  Shopify.Cart(cartId).Checkout(customer, billing)
//? Precisely to submitt when done with the listing the items on the cart
// TODO: find out how to implement stripe with shopify, the logic come here!
const payForOrder = (orderId, token, email) =>
  Shopify.Orders.Payment(orderId, {
    gateway: 'stripe',
    method: 'purchase',
    payment: token,
    options: {
      receipt_email: email,
    },
  })

const login = ({email, password}) =>
  Shopify.Customers.Token(email, password).then(data => {
    const {
      data: {customer_id: id, token},
    } = data
    return {
      id,
      token,
    }
  })

const register = ({email, password, ...rest}) =>
  Shopify.Customers.Create({
    email,
    password,
    type: 'customer',
    ...rest,
  }).then(data => {
    console.log('hi', data)
    const {
      data: {name, id},
    } = data
    return login({email, password}).then(data => {
      const {token} = data
      return {
        id,
        name,
        email,
        token,
      }
    })
  })

const getOrders = token => Shopify.Orders.With('items').All(token)

module.exports = {
  getProducts,
  getProductById,
  addToCart,
  getCartItems,
  removeFromCart,
  checkoutCart,
  payForOrder,
  register,
  login,
  getOrders,
}
