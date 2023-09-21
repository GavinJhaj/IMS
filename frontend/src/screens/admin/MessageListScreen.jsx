import React,{useEffect,useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button,Row,Col,Table} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useGetContactDetailsQuery} from '../../slices/contactSlice';
import {Link,useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const MessageListScreen = () => {

  const {data:message,isLoading,error}=useGetContactDetailsQuery();
  return <>
  <h1>Messages</h1>
  {isLoading?<Loader/>
  :error?<Message variant="Danger">{error?.data?.message||error.message}</Message>
  :(
  <Table striped hover responsive className='table-sm'>
     <thead>
        <tr>
           <th>Date</th>
           <th>Time</th>
           <th>Name</th>
           <th>Message</th>
        </tr>
    </thead>
    <tbody>

      {message.map((sms)=>(
            <tr key={sms._id}>
              <td>{new Date(sms.createdAt).toLocaleDateString("en-GB")}</td>
              <td>{new Date(sms.createdAt).toLocaleTimeString()}</td>
              <td>{sms.contactus.email}</td>
              <td>{sms.contactus.message}</td>
              <td>
          <Link to={`/admin/message/${sms._id}`}>View</Link>
              </td>
            </tr>
          ))
             
          }
    </tbody>
  </Table>
 )}
  </>
}

export default MessageListScreen
