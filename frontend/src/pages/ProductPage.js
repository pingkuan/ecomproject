import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  InputGroup,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/proudctActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductPage = () => {
  const [qty, setQty] = useState(0)
  const dispatch = useDispatch(0)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  let { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col className="qtyCol">數量：</Col>
                        <Col>
                          <InputGroup className="mb-3">
                            <Button
                              variant="outline-secondary"
                              onClick={() => {
                                setQty(Math.max(qty - 1, 0))
                              }}
                            >
                              -
                            </Button>
                            <Form.Control
                              value={qty}
                              pattern="[0-9]*"
                              onChange={(e) =>
                                setQty((p) =>
                                  e.target.validity.valid
                                    ? Math.min(
                                        product.countInStock,
                                        Math.max(e.target.value, 0)
                                      )
                                    : ''
                                )
                              }
                              className="formControl"
                            ></Form.Control>
                            <Button
                              variant="outline-secondary"
                              onClick={() => {
                                setQty(Math.min(qty + 1, product.countInStock))
                              }}
                            >
                              +
                            </Button>
                          </InputGroup>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Row>
                      <Col>
                        <Button
                          onClick={addToCartHandler}
                          className="btnAddCart"
                          type="button"
                          disabled={
                            product.countInStock === 0 || qty <= 0 || isNaN(qty)
                          }
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
      )}
    </>
  )
}
export default ProductPage
