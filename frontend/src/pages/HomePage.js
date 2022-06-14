import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products.json'
const HomePage = () => {
  return (
    <>
      <h1>單卡</h1>
      <Row>
        {products
          .filter((product) => product.category === 'card')
          .sort((a, b) => b.price - a.price)
          .slice(0, 5)
          .map((product) => (
            <Col key={product.id} sm={12} md={8} lg={4} xl={true}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      <h1>週邊</h1>
      <Row>
        {products
          .filter((product) => product.category === 'Accessories')
          .sort((a, b) => b.price - a.price)
          .slice(0, 5)
          .map((product) => (
            <Col key={product.id} sm={12} md={8} lg={4} xl={true}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  )
}
export default HomePage
