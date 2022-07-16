import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item className='checkOutNav'>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>登入</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>登入</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='checkOutNav'>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>配送地址</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>配送地址</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='checkOutNav'>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>支付方式</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>支付方式</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='checkOutNav'>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>下訂</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>下訂</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};
export default CheckoutSteps;
