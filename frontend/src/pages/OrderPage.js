import { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Link, useNavigate, useMatch } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, deliverOrder } from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import PaypalButton from '../components/PaypalButton';

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderId = useMatch('/order/:id')?.params.id;

  const [clientId, setClientId] = useState('test');

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const initialOptions = {
    'client-id': clientId,
    currency: 'TWD',
    locale: 'zh_TW',
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    const getClientId = async () => {
      const { data: client_Id } = await axios.get('/api/config/paypal');
      setClientId(client_Id);
    };
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      getClientId();
    }
  }, [
    dispatch,
    orderId,
    order,
    successPay,
    successDeliver,
    navigate,
    userInfo,
  ]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>訂單編號 {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>配送及付款情況</h2>
              <p>
                <strong>使用者名稱: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`} className='linkText'>
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>地址:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city} ,
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>於 {order.deliveredAt} 送達</Message>
              ) : (
                <Message variant='danger'>未送達</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支付方式</h2>
              <p>
                <strong>方式: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>已於 {order.paidAt} 付款</Message>
              ) : (
                <Message variant='danger'>未付款</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>訂單商品</h2>
              {order.orderItems.length === 0 ? (
                <Message>購物車是空的</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row className='align-items-center'>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            className='linkText'
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x NT {item.price} = NT
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup>
              <ListGroup.Item variant='flush'>
                <h2>訂單資料</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>商品價格</Col>
                  <Col>NT {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>運費</Col>
                  <Col>NT {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>總價</Col>
                  <Col>NT {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && !userInfo.isAdmin && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <PayPalScriptProvider options={initialOptions}>
                    <PaypalButton
                      clientId={clientId}
                      price={order.totalPrice}
                      showSpinner={false}
                      orderId={orderId}
                    />
                  </PayPalScriptProvider>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block fullwidthBtn'
                      onClick={deliverHandler}
                    >
                      標記為送達
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default OrderPage;
