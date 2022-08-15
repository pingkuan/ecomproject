import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const ProductCategory = ({ category, image, name }) => {
  return (
    <>
      <LinkContainer to={`/${category}/page`}>
        <Card
          className='text-center w-100 galleryBox text-decoration-none cardHover'
          as='a'
          href={`/${category}/page`}
        >
          <Card.Img src={image} variant='top' className=' img-fluid' />
          <Card.Body className='d-flex flex-column'>
            <Card.Title as='h3'>
              <strong>{name}</strong>
            </Card.Title>
            <Button
              type='button'
              className='btn btn-primary align-self-center btn-sm'
            >
              查詢所有
            </Button>
          </Card.Body>
        </Card>
      </LinkContainer>
    </>
  );
};
export default ProductCategory;
