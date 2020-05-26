import React from 'react'
import Headroom from 'react-headroom'
import Footer from '../Footer'
import Header from '../Header'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

const Layout = ({location, children}) => (
  <>
    <Headroom
      upTolerance={10}
      downTolerance={10}
      style={{zIndex: '20', height: '5rem'}}
    >
      <Header location={location} />
    </Headroom>
    <Container text>{children}</Container>
    <Footer />
  </>
)

export default Layout
