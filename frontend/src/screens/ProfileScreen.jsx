import React, { useEffect, useState } from 'react';
import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card,Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useProfileMutation} from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';
import {FaTimes} from 'react-icons/fa'
import {useGetProductsQuery} from '../slices/productsApiSlice';
import Paginate from '../components/Paginate';


const ProfileScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const dispatch=useDispatch();

    const {userInfo}=useSelector((state)=>state.auth);

    const {pageNumber,keyword}=useParams();
    
    const [updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation();

    const {data,isLoading,error}=useGetProductsQuery({keyword,pageNumber});
    

    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    },[userInfo,userInfo.name,userInfo.email]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error('Password do not match')
        }else{
            try{
                const res=await updateProfile({_id:userInfo._id,name,email,password}).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile Updated')

            }catch(error){
                toast.error(error?.data?.message || error.error);

            }
        }
    }
    console.log('Name:', name);
    console.log('Products:', data?.product);



  return (
   <Row>
    <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='name' className='my-2'>
               <Form.Label>Name</Form.Label>
               <Form.Control type='name' placeholder='Enter name' value={name}
               onChange={(e)=>setName(e.target.value)}
               disabled={userInfo ? !userInfo.isAdmin : true}>
               </Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
               <Form.Label>Email Address</Form.Label>
               <Form.Control type='email' placeholder='Enter email' value={email}
               onChange={(e)=>setEmail(e.target.value)}>
               </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
               <Form.Label>Password</Form.Label>
               <Form.Control type='password' placeholder='Enter password' value={password}
               onChange={(e)=>setPassword(e.target.value)}>
               </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmpassword' className='my-2'>
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}>
               </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>Update</Button>
            {loadingUpdateProfile && <Loader/>}
        </Form>
    </Col>
    <Col md={9}>
   <h2>My Injury</h2>
   {isLoading?(<Loader/>)
   :error?(<Message variant='danger'>{error?.data?.message||error.error}</Message>)
   :(<>
   <Table striped hover responsive className='table-sm'>
    
    <thead>
        <tr>
           <th>Name</th>
           <th>Date of Injury</th>
           <th>Injury Type</th>
           <th>Action Taken</th>
           <th>Action Needed</th>
           <th></th>
        </tr>
    </thead>
    <tbody>
    {data?.product.filter(productt => productt.name === name).map((productt) => (
    <tr key={productt._id}>
        <td>{productt.name}</td>
        <td>{productt.dateOf}</td>
        <td>{productt.brand}</td>
        <td>{productt.category}</td>
        <td>{productt.countInStock}</td>
        <td><Link to={`/player/${productt._id}`}>View</Link></td>
    </tr>
))}
    </tbody>
   </Table>
   </>
   )}
    </Col>
   </Row>
  )
}

export default ProfileScreen