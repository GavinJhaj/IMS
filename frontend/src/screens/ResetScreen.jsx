import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Container,Row,Col,Form ,Button} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';
import {useResetPasswordMutation} from '../slices/usersApiSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const ResetScreen= () => {

    const [show, setShow] = useState(false);

    const [email, setEmail] = useState("");

    const [resetPassword,{data,error}]=useResetPasswordMutation();

    const sendEmail = async (e) => {
        e.preventDefault();


        try {
            await resetPassword(email);
            setShow(true);
            setEmail("");
            toast.success("Email Sent");
          } catch (error) {
            toast.error(error?.data?.message||error.error)
          }
    }

    return (
        <>
    <FormContainer>
      <h1>Rest Password</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
         <Form.Label>Enter Email</Form.Label>
            <Form.Control type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        </Form.Group>
                <Button type='submit' value='primary' className='mt-2' onClick={sendEmail}>
                    Send Email
                </Button>
        </Form>
     
    </FormContainer>

        </>
    )
}

export default ResetScreen








