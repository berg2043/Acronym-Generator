import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Axios from 'axios';
import AdminRow from '../AdminRow/AdminRow';

const Admin = () => {
  // Connects to redux
  const user = useSelector(state=>state.username);
  
  // Default state
  const [removals, setRemovals] = useState([])

  // conditionally renders the page
  if(user.admin && removals.length === 0){
    Axios.get('/api/admin').then(response=>{
      setRemovals(response.data);
    })
  } else {
    console.log(user.admin, removals.length);
    // push to 403
  }

  return(
    <>
      <Table style={{maxWidth: 800, margin: 'auto', backgroundColor: '#5F5B5B', marginTop: 8}}>
        <TableHead>
          <TableRow style={{backgroundColor: 'black', }}>
            <TableCell>Words</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Times Favorited</TableCell>
            <TableCell colSpan={2}>Remove?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {removals.map(item=>{
            return(
              <AdminRow setRemovals={setRemovals} item={item} key={item.id}/>
            )
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Admin;