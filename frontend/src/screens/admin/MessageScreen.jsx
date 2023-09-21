import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetMessageDetailsQuery } from '../../slices/contactSlice'
import {Card} from 'react-bootstrap'

const MessageScreen = () => {
  const { id } = useParams()
  const { data: message, isLoading, error } = useGetMessageDetailsQuery(id)

  return isLoading ? (
    <Loader/>
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.message}</Message>
  ) : (
    <Card className="m-4">
    <Card.Header as="h5">Message Details</Card.Header>
    <Card.Body>
      <Card.Title>Name: {message.contactus.email}</Card.Title>
      <Card.Text>
        Message: {message.contactus.message}
      </Card.Text>
    </Card.Body>
  </Card>

  )
}

export default MessageScreen
