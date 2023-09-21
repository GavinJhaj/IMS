import React,{useEffect,useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button,Row,Col,Table} from 'react-bootstrap';
import {FaTimes,FaCheck,FaTrash,FaEdit} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useGetUsersQuery,useDeleteUserMutation} from '../../slices/usersApiSlice';
import {Link,useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const  UserListScreen = () => {

  const {data:users,refetch,isLoading,error}=useGetUsersQuery();

  const [deleteUser,{isLoading:loadingDelete}]=useDeleteUserMutation();


  const deleteHandler=async(id)=>{
    if(window.confirm('Are you sure?')){
        try {
            await deleteUser(id);
            refetch();
            toast.success('User deleted')
        } catch (error) {
            toast.error(error?.data?.message|error.error)
            
        }
    }
  }



  return <>
  <Row className="align-items-center">
      <Col>
        <h1>Player List</h1>
      </Col>
      {/* <Col className="text-end">
        <Button className="btn-sm m-3">
        <FaEdit/> Create User
        </Button>
      </Col> */}
    </Row>
  {loadingDelete && <Loader/>}
  {isLoading?<Loader/>
  :error?<Message variant="Danger">{error?.data?.message||error.message}</Message>
  :(
  <Table striped hover responsive className='table-sm'>
     <thead>
        <tr>
           <th>ID</th>
           <th>Username</th>
           <th>Email</th>
           <th>DATE</th>
           <th>COACHES</th>
           <th></th>
           
        </tr>
    </thead>
    <tbody>
        {users.map((user)=>(
            <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>{user.createdAt.substring(0,10)}</td>
                <td>{!user.isAdmin?(
                    (<FaTimes color='red'/>)
                ):(<FaCheck color='green'/>)}</td>


                <td>
                {/* {!user.isAdmin?(<>
                   <LinkContainer to={`/admin/user/${user._id}/edit`}>
                   <Button className='btn-sm ' variant='light'><FaEdit color='green'/> Edit</Button>         
               </LinkContainer>
               <Button variant='light' className='btn-sm mx-2' onClick={()=>deleteHandler(user._id)}><FaTrash color='red'/></Button>
               </>
                ):(<FaTimes color='red'/>)} */}

<LinkContainer to={`/admin/user/${user._id}/edit`}>
                   <Button className='btn-sm ' variant='light'><FaEdit color='green'/> Edit</Button>         
               </LinkContainer>
               <Button variant='light' className='btn-sm mx-2' onClick={()=>deleteHandler(user._id)}><FaTrash color='red'/></Button>
                    
                </td>
            </tr>
        ))}
    </tbody>
  </Table>
 )}
  </>
}

export default  UserListScreen