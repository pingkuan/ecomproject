import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState({
    userName: false,
    signIn: false,
    adminMenu: false,
  });
  const [nowShow, setNowShow] = useState();
  const { userName, signIn, adminMenu } = show;

  const showDropdown = (e) => {
    setShow((prevState) => ({
      ...prevState,
      [e.target.id]: !prevState[e.target.id],
    }));
    setNowShow(e.target.id);
  };

  const hideDropdown = () => {
    setShow((prevState) => ({
      ...prevState,
      [nowShow]: false,
    }));
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' fixed='top' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>卡店</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>購物車
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='userName'
                  show={userName}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>個人資料</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    登出
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title={
                    <>
                      <i className='fas fa-user'></i>登入
                    </>
                  }
                  id='signIn'
                  show={signIn}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <LinkContainer to='/login'>
                    <NavDropdown.Item>登入</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <NavDropdown.Item>註冊</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title='Admin'
                  id='adminMenu'
                  show={adminMenu}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>使用者名單</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>商品清單</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>訂單</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
