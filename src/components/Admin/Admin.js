import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, makeStyles, TableBody } from '@material-ui/core';
import Axios from 'axios';
import AdminRow from '../AdminRow/AdminRow';

const Admin = () => {
  const [removals, setRemovals] = useState([])
  const user = useSelector(state=>state.username);

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Words</TableCell>
            <TableCell>Length</TableCell>
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