import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Link,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button,Form } from 'react-bootstrap'
import {useGetProductDetailsQuery,useCreateReviewMutation} from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Meta from '../components/Meta';

const PlayerScreen = () => {


  const{id:productId}=useParams()

  const dispatch=useDispatch();
  const nagivate=useNavigate();

  const [qty,setQty]=useState(1);

  const [rating,setRating]=useState(0);

  const [comment,setComment]=useState('')

  const {data:products,isLoading,refetch,error}=useGetProductDetailsQuery(productId)

  const [ createReview,{isLoading:loadingReview}]=useCreateReviewMutation()

  const {userInfo}=useSelector((state)=>state.auth);


  const createReviewHandaler=async(e)=>{
    e.preventDefault()
    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
      
    } catch (error) {
      toast.error(error?.data?.message||error.error);
    }
  }

  return (
    <>
    {isLoading?(<Loader/>):error?(<Message variant='danger'>{error?.data?.message||error.error}</Message>)
    :(
    <>
    <Row className="justify-content-md-center"> 
            <Col xs={12} md={8}>
    
    <Image src={`http://localhost:5000${products.image}`} alt={products.name} fluid style={{
    height: '80px', 
    width:'80px',
    borderRadius: '100px', 
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px'
  }}/>

<Form >
  <Form.Group controlId='name'>
    <Form.Label>Player Name</Form.Label>
    <Form.Control
    type='text'
    value={products.name}
    disabled
    >
    </Form.Control>
  </Form.Group>

  <Form.Group controlId='name'>
    <Form.Label>Date of Injury</Form.Label>
    <Form.Control
    type='date'
    value={products.dateOf}
    disabled>
    </Form.Control>
  </Form.Group>

  <Form.Group controlId='name'>
    <Form.Label>Injury Type</Form.Label>
    <Form.Control
    type='text'
    value={products.brand}
    disabled>
    </Form.Control>
  </Form.Group>


  <Form.Group controlId='name'>
    <Form.Label>Action Taken</Form.Label>
    <Form.Control
    type='text'
    value={products.category}
    disabled>
    </Form.Control>
  </Form.Group>


  <Form.Group controlId='name'>
    <Form.Label>Action Needed</Form.Label>
    <Form.Control
    type='text'
    value={products.countInStock}
    disabled>
    </Form.Control>
  </Form.Group>

  {/* <Form.Group controlId='name'>
    <Form.Label>Description</Form.Label>
    <Form.Control
    type='text'
    value={products.description}
    disabled>
    </Form.Control>
  </Form.Group> */}

</Form>
    <Meta title={products.name}/>
        <Row className='review' style={{marginTop:'50px'}}>
          <Col md={12}>

          {products.reviews.length===0 && <Message>No Comments</Message>}
          <ListGroup variant='flush'>
            {products.reviews.map((review)=>(
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                {/* <Rating value={review.rating}/> */}
                <p>{review.createdAt.substring(0.10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>

              <h2>Write a players comments</h2>
              {loadingReview && <Loader/>}

              {
                userInfo?(
                  <Form onSubmit={createReviewHandaler}>
                    <Form.Group className='py-2'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                      as='textarea'
                      row='3'
                      value={comment}
                      onChange={(e)=>setComment(e.target.value)}
                      >
                      </Form.Control>
                    </Form.Group>
                    <Button
                    disabled={loadingReview}
                    type='submit'
                    variant='primary'
                    >Submit</Button>
                  </Form>

                ):(<Message variant='danger'> Please <Link to='/login'>Sign in</Link> to write</Message>)
              }
            </ListGroup.Item>
          </ListGroup>
          </Col>
        </Row>
        </Col>
        </Row>
        {/* <Button className='btn-block' type='button' disabled={products.countInStock===0}
                        onClick={addToCartHandler}>
                          Add To Cart
        </Button> */}
    </>
    )}
     
    </>
  )
}

export default PlayerScreen