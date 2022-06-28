import { useEffect } from 'react'
import { useMatch, useLocation, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
  InputGroup,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartPage = () => {
  let location = useLocation()
  const navigate = useNavigate()

  const productId = useMatch('/cart/:id')?.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId && qty > 0) {
      dispatch(addToCart(productId, qty))
    }
    if (qty < 1) {
      navigate(`../`)
    }
  }, [dispatch, productId, qty, navigate])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>購物車</h1>
        {cartItems.length === 0 ? (
          <Message>
            購物車是空的<Link to="/">回到首頁</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <ListGroupItem key={item.product}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className="imageInCart">
                    <Link to={`/product/${item.product}`} className="linkText">
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>NT{item.price}</Col>
                  <Col md={4}>
                    <InputGroup className="mb-3 cartInputPosition">
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          if (item.qty > 0) {
                            dispatch(addToCart(item.product, item.qty - 1))
                          }
                        }}
                      >
                        -
                      </Button>
                      <Form.Control
                        value={item.qty}
                        pattern="[0-9]*"
                        onChange={(e) => {
                          if (e.target.validity.valid) {
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        }}
                        className="formControl"
                      ></Form.Control>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          if (item.qty < item.countInStock) {
                            dispatch(addToCart(item.product, item.qty + 1))
                          }
                        }}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>總額</h3>
              NT
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block btnGoCheckout"
                disabled={
                  cartItems.length === 0 ||
                  cartItems.reduce((acc, item) => acc + item.qty, 0) === 0
                }
                onClick={checkoutHandler}
              >
                結帳
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
export default CartPage
