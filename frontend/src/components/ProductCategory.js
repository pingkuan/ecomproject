import { Card, Button } from 'react-bootstrap';

const ProductCategory = ({ category, image, name }) => {
  return (
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
  );
};
export default ProductCategory;
