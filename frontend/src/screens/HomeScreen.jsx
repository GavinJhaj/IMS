import React,{useEffect} from 'react';
import { Container, Row, Col,Table } from 'react-bootstrap';
import Player from '../components/Player';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams,useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { useSelector } from 'react-redux';
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {pageNumber,keyword}=useParams();
  useEffect(() => {
  // If the user is not logged in, redirect them to the login page
  if (!userInfo) {
    navigate('/login');
  }
}, [userInfo, navigate]);
  const {data,isLoading,error}=useGetProductsQuery({keyword,pageNumber});


  return (
    <>
    {/* {!keyword?(<ProductCarousel/>):(<Link to='/' className='btn btn-light'>Go Back</Link>)} */}
    {isLoading?(<><Loader/></>):error?(<Message variant='danger'>{error?.data?.message||error.error}</Message>):(
    <>
    <>
    {/* <h1 style={{color:'black',textAlign:'center'}}>Payers Injury</h1> */}
    
        {data.product.map((productt) => (
          <Col className='table-sm w-100' key={productt._id} sm={12} md={6} lg={4} xl={3}>
            <Player prduct={productt}/>
          </Col>
        ))}
   </>
      <Paginate pages={data.pages} page={data.page} keyword={keyword?keyword:''}/>
    </>)}
    </>
  );
};

export default HomeScreen;
