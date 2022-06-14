import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  const [show, setShow] = useState(false)
  const showDropdown = (e) => {
    setShow(!show)
  }
  const hideDropdown = (e) => {
    setShow(false)
  }
  return (
    <header>
      <Navbar bg="dark" variant="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ecoproject</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              <NavDropdown
                title={
                  <>
                    <i className="fas fa-shopping-cart"></i>sign in
                  </>
                }
                id="collasible-nav-dropdown"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                Sign in
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
