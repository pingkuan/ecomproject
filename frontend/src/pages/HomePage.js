import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import ProductCategory from '../components/ProductCategory';
import Meta from '../components/Meta';

const HomePage = () => {
  const { keyword } = useParams();

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>商品</h1>
      <Row>
        <Col sm={6} lg={6} className='mb-4 d-flex'>
          <ProductCategory
            category={'card'}
            image={'/images/14558127.jpg'}
            name={'單卡'}
          />
        </Col>
        <Col sm={6} lg={6} className='mb-4 d-flex'>
          <ProductCategory
            category={'Accessories'}
            image={'/images/1.jpg'}
            name={'周邊'}
          />
        </Col>
      </Row>
    </>
  );
};
export default HomePage;
