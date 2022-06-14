import { useParams } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products.json'
const ProductPage = () => {
  let { id } = useParams()
  let idParam = parseInt(id)
  const product = products.find((p) => p.id === idParam)
  return (
    <>
      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>價格： NT{product.price}</ListGroupItem>
            <ListGroupItem>
              商品說明: {<br />}
              {product.desc}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>價格：</Col>
                  <Col className="text-center text-md-start">
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>庫存：</Col>
                  <Col className="text-center text-md-start">
                    {product.countInStock > 0
                      ? product.countInStock + '件'
                      : '缺貨'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <Button
                      className="btnAddCart"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      加入購物車
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default ProductPage
