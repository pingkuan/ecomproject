import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            This website is a fullstack practice project and is not produced by,
            endorsed by, supported by, or affiliated with Konami Digital
            Entertainment.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
export default Footer
