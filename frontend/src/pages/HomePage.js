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
            image={
              'https://firebasestorage.googleapis.com/v0/b/yugiohcardshopapp.appspot.com/o/images%2F14558127.jpg?alt=media'
            }
            name={'單卡'}
          />
        </Col>
        <Col sm={6} lg={6} className='mb-4 d-flex'>
          <ProductCategory
            category={'Accessories'}
            image={
              'https://firebasestorage.googleapis.com/v0/b/yugiohcardshopapp.appspot.com/o/images%2F1.jpg?alt=media'
            }
            name={'周邊'}
          />
        </Col>
      </Row>
    </>
  );
};
export default HomePage;
