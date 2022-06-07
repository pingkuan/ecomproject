import { Nav, Navbar, Container } from 'react-bootstrap'
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">ecoproject</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
