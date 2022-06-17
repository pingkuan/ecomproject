import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/proudctActions'

const HomePage = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>單卡</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products
              .filter((product) => product.category === 'card')
              .sort((a, b) => b.price - a.price)
              .slice(0, 5)
              .map((product) => (
                <Col key={product._id} sm={12} md={8} lg={4} xl={true}>
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
                <Col key={product._id} sm={12} md={8} lg={4} xl={true}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  )
}
export default HomePage
