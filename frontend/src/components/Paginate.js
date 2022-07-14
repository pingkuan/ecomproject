import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const navigate = useNavigate();

  const choosePage = () => {
    const chosenPage = Number(prompt('輸入頁數', ''));
    isNaN(chosenPage)
      ? choosePage()
      : chosenPage > pages
      ? (chosenPage = pages)
      : chosenPage < 1
      ? (chosenPage = 1)
      : chosenPage;

    navigate(
      !isAdmin
        ? keyword
          ? `/search/${keyword}/page/${chosenPage}`
          : `/page/${chosenPage}`
        : `/admin/productlist/${chosenPage}`
    );
  };

  return pages > 7 && page < 5 ? (
    <Pagination>
      {[...Array(5).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
      <Pagination.Ellipsis onClick={choosePage}></Pagination.Ellipsis>
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${pages}`
              : `/page/${pages}`
            : `/admin/productlist/${pages}`
        }
      >
        <Pagination.Item>{pages}</Pagination.Item>
      </LinkContainer>
    </Pagination>
  ) : page <= pages && page > pages - 4 && pages > 7 ? (
    <Pagination>
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${1}`
              : `/page/${1}`
            : `/admin/productlist/${1}`
        }
      >
        <Pagination.Item>{1}</Pagination.Item>
      </LinkContainer>
      <Pagination.Ellipsis onClick={choosePage}></Pagination.Ellipsis>
      {[...Array(5).keys()].map((x) => (
        <LinkContainer
          key={pages - x}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${page - x}`
                : `/page/${pages - x}`
              : `/admin/productlist/${pages - x}`
          }
        >
          <Pagination.Item active={pages - x === page}>
            {pages - x}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : page > 4 && page < pages - 4 && pages > 7 ? (
    <Pagination>
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${1}`
              : `/page/${1}`
            : `/admin/productlist/${1}`
        }
      >
        <Pagination.Item>{1}</Pagination.Item>
      </LinkContainer>
      <Pagination.Ellipsis onClick={choosePage}></Pagination.Ellipsis>
      {[...Array(3).keys()].map((x) => (
        <LinkContainer
          key={page + x - 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${page + x - 1}`
                : `/page/${pages + x - 1}`
              : `/admin/productlist/${pages + x - 1}`
          }
        >
          <Pagination.Item active={page + x - 1 === page}>
            {page + x - 1}
          </Pagination.Item>
        </LinkContainer>
      ))}

      <Pagination.Ellipsis onClick={choosePage}></Pagination.Ellipsis>
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${pages}`
              : `/page/${pages}`
            : `/admin/productlist/${pages}`
        }
      >
        <Pagination.Item>{pages}</Pagination.Item>
      </LinkContainer>
    </Pagination>
  ) : pages > 1 && pages < 8 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : null;
};

export default Paginate;
