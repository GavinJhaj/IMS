import React,{useEffect,useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom'
import {Button,Row,Col,Table,Form} from 'react-bootstrap';
import {FaTimes,FaEdit,FaTrash} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer'
import {useUpdateUserMutation,useGetUserDetailsQuery} from '../../slices/usersApiSlice';
import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UserEditScreen = () => {
    const {id:userId}=useParams();


    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [isAdmin,setIsAdmin]=useState(false);
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
   

    const {data:user,isLoading,refetch,error} =useGetUserDetailsQuery(userId);

    const [updateUser,{isLoading:loadingUserUpdating}] =useUpdateUserMutation();




    const navigate=useNavigate();

    useEffect(()=>{
        if(user){
           setName(user.name);
           setEmail(user.email);
           setIsAdmin(user.isAdmin);
        }
    },[user]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            await updateUser({userId,name,email,isAdmin});
            toast.success('User updated');
            refetch();
            navigate('/admin/userlist');
            
        } catch (error) {
            toast.error(error?.data?.message||error.error);
            
        }

    }



  return (
    <>
    <Link to="/admin/userlist" className='btn btn-light my-3'>
    GO Back
    </Link>
    <FormContainer>
        <h2>Edit User</h2>
        {loadingUserUpdating && <Loader/>}
        {
            isLoading?<Loader/>
            :error?<Message variant='danger'>{error}</Message>:(
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='py-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isAdmin' className='py-2' >
                        <Form.Label>Coaches</Form.Label>
                            <Form.Check
                            type='checkbox'
                            label='Is Coaches'
                            checked={isAdmin}
                            onChange={(e)=>setIsAdmin(e.target.checked)}
                            >

                            </Form.Check>
                       
                    </Form.Group>
                    <Button type='submit' value='primary' className='my-2'>Update</Button>
                </Form>
            )
        }
    </FormContainer>
    </>
  )
}

export default UserEditScreen