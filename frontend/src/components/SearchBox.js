import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}/page/1`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Form className='searchForm'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='搜尋商品...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
      </Form>
      <Button
        type='submit'
        onClick={submitHandler}
        variant='outline-success'
        className='searchBtn'
      >
        搜尋
      </Button>
    </>
  );
};
export default SearchBox;
