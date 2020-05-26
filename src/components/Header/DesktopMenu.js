import React, {useState, useEffect} from 'react'
import {Link, withPrefix} from 'gatsby'
import {Menu, Container} from 'semantic-ui-react'
import ShoppingCartIcon from './ShoppingCartIcon'
import Logo from './Logo'

const DesktopMenu = ({location: {pathname}, token, cartCount}) => {
  const [activeItem, setActiveItem] = useState(pathname)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  return (
    <Menu size="huge" borderless >
      <Container text>
        <Menu.Item
          active={activeItem === withPrefix('/')}
          as={Link}
          to="/"
          header
        >
          <Logo />
        </Menu.Item>
        {token ? (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/cart/"
              active={activeItem === withPrefix('/cart/')}
            >
              <ShoppingCartIcon cartCount={cartCount} name="Cart" />
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/cart/"
              active={activeItem === withPrefix('/cart/')}
            >
              <ShoppingCartIcon cartCount={cartCount} name="Cart" />
            </Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  )
}

export default DesktopMenu
