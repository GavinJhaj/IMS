import React from 'react'
import { Card,Table,Image } from 'react-bootstrap'
import {Link}  from 'react-router-dom'
const Player = ({prduct}) => {
  return (

<Table striped hover responsive className='table-sm w-100'>
<thead>
<tr>
  <th>Picture</th>
  <th>Player Name</th>
  <th>Date of Injury</th>
  <th>Injury Type</th>
  <th>Action Taken</th>
  <th>Action Needed</th>
  <th></th>
  
</tr>
</thead>
<tbody>

    <tr key={prduct._id}>
      <td><Image src={`http://localhost:5000${prduct.image}`} style={{height:"40px",width: "40px",borderRadius:'50px' }}/></td>
      <td>{prduct.name}</td>
      <td>{prduct.dateOf}</td>
      <td>{prduct.category}</td>
      <td>{prduct.brand}</td>
      <td>{prduct.countInStock}</td>
      <td><Link to={`/player/${prduct._id}`}>View</Link></td>
    </tr>
    
</tbody>
</Table>
    
  )
}




export default Player


