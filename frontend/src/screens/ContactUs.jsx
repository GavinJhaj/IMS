import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Link,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button,Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useCreateContactMutation,useGetContactDetailsQuery } from '../slices/contactSlice';

const ContactUs = () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [createContact, { isLoading, isError, isSuccess }] = useCreateContactMutation()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await createContact({ email, message }).unwrap()
        } catch (err) {
            console.error('Failed to create contact: ', err)
        }
    }

    return (
        <Row className="justify-content-md-center"> 
            <Col xs={12} md={6}>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='message'>
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as='textarea'
                    placeholder='Enter message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' style={{marginTop:'30px'}}>
                Send
            </Button>
            {isLoading && <Loader />}
            {isError && <Message variant='danger'>Something went wrong...</Message>}
            {isSuccess && <Message variant='success'>Message sent successfully!</Message>}
        </Form>
        </Col>
        </Row>
    )

}

export default ContactUs