import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar,Nav,Container, Badge, NavDropdown, Form } from 'react-bootstrap';
import {FaShoppingCart,FaUser,FaEnvelope} from 'react-icons/fa';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import {useSelector,useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout} from '../slices/authSlice'
import SearchBox from './SearchBox';

const Header = () => {

  const {userInfo}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  return (
    <header>
       
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect style={{ position: "fixed", width: "100%", zIndex: "1" }}>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>INJURY MANAGEMENT SYSTEM</Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="ms-auto">
           {userInfo && <SearchBox/>}
           {!userInfo &&
           <LinkContainer to='/contactus'>
                <Nav.Link><FaEnvelope size={22} style={{marginRight:'10px'}}/>Send Message</Nav.Link>
              </LinkContainer>}
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  )
}

export default Header