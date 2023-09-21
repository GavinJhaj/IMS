import React, { useEffect, useState } from 'react';
import {Link,useParams,useNavigate} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card,Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useSetNewPasswordMutation} from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';
import FormContainer from '../components/FormContainer'

const SetPassScreen = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the token from the URL
    const { token } = useParams();

    const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                // Call the setNewPassword endpoint, sending the new password and the token
                await setNewPassword({ password, token }).unwrap();

                toast.success('Password has been reset.');
                // Redirect user to login screen
                navigate('/login');
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    }

    return (
        <>< FormContainer>
            <h1>Set New Password</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='confirmpassword' className='my-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2' disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Set New Password'}
                </Button>
            </Form>
            </FormContainer>
        </>
    )
}

export default SetPassScreen;




