import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, makeStyles, TableBody } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme=>({
  pseudolink: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}))

const Admin = () => {
  const [removals, setRemovals] = useState([])
  const classes = useStyles();
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
              <TableRow key={item.id}>
                <TableCell>{item.word}</TableCell>
                <TableCell>{item.length}</TableCell>
                <TableCell><span className={classes.pseudolink}>Yes</span></TableCell>
                <TableCell><span className={classes.pseudolink}>No</span></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Admin;