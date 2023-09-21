import React,{useEffect,useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button,Row,Col,Table} from 'react-bootstrap';
import {FaTimes,FaEdit,FaTrash} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation} from '../../slices/productsApiSlice';
import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
const PlayerListScreen = () => {

  const {pageNumber}=useParams();

  const {data,isLoading,error,refetch} =useGetProductsQuery({pageNumber});
  const [createProduct,{isLoading:loadingCreate}] =useCreateProductMutation();
  const [deleteProduct,{isLoading:loadingDelete}] =useDeleteProductMutation();

  const createProductHandler=async()=>{
    if(window.confirm('Are you sure you want to create new injury?'))
    {
      try{
        await createProduct();
        refetch();

      }catch(error){
        toast.error(error?.data?.message||error.error);

      }
    }
  }

  const deleteHandler=async(id)=>{
    if(window.confirm('are you sure?')){
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Injury Deleted')
        
      } catch (error) {
        toast.error(error?.data?.message||error.error)
      }
    }

  }


  return (
    <>
    <Row className="align-items-center">
      <Col>
        <h1>Reporting Injuries</h1>
      </Col>
      <Col className="text-end">
        <Button onClick={createProductHandler} className="btn-sm m-3">
        <FaEdit/> Add Injury
        </Button>
      </Col>
    </Row>
    {loadingCreate && <Loader/>}
    {loadingDelete && <Loader/>}
    {isLoading?(<Loader/>):error?(<Message variant='danger'>{error}</Message>)
    :(
      <>
      <Table striped hover responsive className='table-sm'>
        <thead>
        <tr>
          {/* <th>Player Id</th> */}
          <th>Player Name</th>
          <th>Date of Injury</th>
          <th>Injury Type</th>
          <th>Action Taken</th>
          <th>Action Needed</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          {data.product.map((productt)=>(
            <tr key={productt._id}>
              {/* <td>{productt._id}</td> */}
              <td>{productt.name}</td>
              <td>{productt.dateOf}</td>
              <td>{productt.category}</td>
              <td>{productt.brand}</td>
              <td>{productt.countInStock}</td>
              <td>
                <LinkContainer to={`/admin/product/${productt._id}/edit`}>
               <Button variant='light' className='btn-sm mx-2'><FaEdit color='green'/> Edit</Button>
                </LinkContainer>
                <Button variant='light' className='btn-sm mx-2' onClick={()=>deleteHandler(productt._id)}><FaTrash color='red'/></Button>
              </td>

            </tr>
          ))
             
          }
        </tbody>
      </Table>
      <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
      </>
    )}
    </>
  )
}

export default PlayerListScreen