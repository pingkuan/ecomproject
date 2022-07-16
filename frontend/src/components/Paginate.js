import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  category = '',
}) => {
  const navigate = useNavigate();

  function choosePage() {
    let chosenPage;

    do {
      chosenPage = Number(prompt('輸入頁數', ''));
    } while (isNaN(chosenPage));

    if (chosenPage !== 0) {
      navigate(
        !isAdmin
          ? keyword
            ? `/search/${keyword}/page/${chosenPage}`
            : `/${category}/page/${chosenPage}`
          : `/admin/productlist/${chosenPage}`
      );
    }
  }

  return pages > 7 && page < 5 ? (
    <Pagination>
      {[...Array(5).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/${category}/page/${x + 1}`
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
              : `/${category}/page/${pages}`
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
              : `/${category}/page/${1}`
            : `/admin/productlist/${1}`
        }
      >
        <Pagination.Item>{1}</Pagination.Item>
      </LinkContainer>
      <Pagination.Ellipsis onClick={choosePage}></Pagination.Ellipsis>
      {[...Array(5).keys()].map((x) => (
        <LinkContainer
          key={pages - 4 + x}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${pages - 4 + x}`
                : `/${category}/page/${pages - 4 + x}`
              : `/admin/productlist/${pages - 4 + x}`
          }
        >
          <Pagination.Item active={pages - 4 + x === page}>
            {pages - 4 + x}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : page > 4 && page <= pages - 4 && pages > 7 ? (
    <Pagination>
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${1}`
              : `/${category}/page/${1}`
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
                : `/${category}/page/${page + x - 1}`
              : `/admin/productlist/${page + x - 1}`
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
              : `/${category}/page/${pages}`
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
                : `/${category}/page/${x + 1}`
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
