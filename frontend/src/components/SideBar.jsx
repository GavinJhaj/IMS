import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Sidebar = () => {
  
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  if (!userInfo) {
    return null
  }

  return (
    <ListGroup>
     
      <ListGroup.Item>
        <Link style={{ textDecoration: 'none' }} to='/dashboard'>Dashboard</Link>
      </ListGroup.Item>
      <ListGroup.Item>
            <Link style={{ textDecoration: 'none' }} to='/profile'>Profile</Link>
            
          </ListGroup.Item>
      <ListGroup.Item>
        <Link style={{ textDecoration: 'none' }} to='/'>Injured List</Link>
      </ListGroup.Item>

      {userInfo && (
        <>
          {!userInfo.isAdmin &&
          <ListGroup.Item>
            <Link style={{ textDecoration: 'none' }} to='/contactus'>Send Message</Link>
          </ListGroup.Item>
}
          
          {userInfo.isAdmin && (
            <>
              <ListGroup.Item>
                <Link style={{ textDecoration: 'none' }} to='/admin/userlist'>Player List</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link style={{ textDecoration: 'none' }} to='/admin/productlist'>Add Injury</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link style={{ textDecoration: 'none' }} to='/admin/messagelist'>Messages</Link>
              </ListGroup.Item>
            </>
          )}

          <ListGroup.Item onClick={logoutHandler}>
            Logout
          </ListGroup.Item>
        </>
      )}

    </ListGroup>
  )
}

export default Sidebar
