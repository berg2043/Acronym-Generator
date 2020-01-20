import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, makeStyles, TableBody } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme=>({
  pseudolink: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}))

const AdminRow = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  function removeWord(){
    dispatch({type: 'REMOVE_WORD', payload: {id: props.item.id}})
    props.setRemovals([]) // Change to a saga
  }

  function unflag(){
    dispatch({type: 'UNFLAG_WORD', payload: {id: props.item.id}})
    props.setRemovals([]) // Change to a saga
  }

  return(
    <TableRow>
      <TableCell>{props.item.word}</TableCell>
      <TableCell>{props.item.length}</TableCell>
      <TableCell>
        <span onClick={removeWord} className={classes.pseudolink}>Yes</span>
      </TableCell>
      <TableCell>
        <span onClick={unflag} className={classes.pseudolink}>No</span>
      </TableCell>
    </TableRow>
  );
};

export default AdminRow;