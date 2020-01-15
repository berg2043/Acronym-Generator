import React, { useState, useReducer } from 'react';
import { TextField, Button } from '@material-ui/core';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Landing = () => {
  // Adds Redux
  const dispatch = useDispatch();
  const acronyms = useSelector(state => state.acronyms)

  // Sets initial counts
  const [inputCount, setInputCount] = useState(2);
  const [currentCount, setCurrentCount] = useState(2);

  // Sets initial inputs
  const initialInput = {
    input1: [
      <TextField label={1} onChange={(event)=>{setInputs({type: 'edit_input', payload:{event: event.target.value, num:1}})}}/>, 
      <Button variant='contained' onClick={()=>setInputs({type: 'delete_input', payload: 'input1'})}>X</Button>,
      ''
    ],
    input2: [
      <TextField label={2} onChange={(event)=>{setInputs({type: 'edit_input', payload:{event: event.target.value, num:2}})}}/>,
      <Button variant='contained' onClick={()=>setInputs({type: 'delete_input', payload: 'input2'})}>X</Button>,
      ''
    ]
  };

  // Master input manipulation function
  function inputFunction(state, action) {
    switch (action.type) {
      case 'add_input': // adds an input
        let count = inputCount+1;
        setInputCount(inputCount+1);
        setCurrentCount(currentCount+1);
        return {...state,[`input${count}`]: [
          <TextField label={count} onChange={(event)=>{setInputs({type: 'edit_input', payload:{event: event.target.value, num:count}})}}/>,
          <Button variant='contained' onClick={()=>setInputs({type: 'delete_input', payload: `input${count}`})}>X</Button>,
          ''
        ]};
      case 'delete_input': // Removes and input
        delete state[action.payload]  ;
        setCurrentCount(currentCount-1);
        return state;
      case 'edit_input': // Edits the value of the input
        state[`input${action.payload.num}`][2] = action.payload.event;
        return state;
      default: 
        return state;
    }
  }

  // Brings all the previous input functionality together
  const [inputs, setInputs] = useReducer(inputFunction, initialInput);

  // Sends the words in the inputs to the server to be stored in session
  // Then calls server for accronyms and word lists
  function submitForm(event){
    event.preventDefault();
    const arr = [];
    Object.entries(inputs).map(([key,val])=>{
      return arr.push(inputs[key][2])
    })
    Axios.post('/api/words/', arr).then((response)=>{
      // Will get tossed into a saga at some point
      dispatch({type: 'GET_ACRONYMS'})
    }).catch(err=>{
      console.log(err);
    })
  }

  return(
    <>
      <form onSubmit={(event)=>submitForm(event)}>
        {Object.entries(inputs).map(([key,val])=>{
          return(
            <span key={key}>
              {val[0]}
            </span>
          );
        })}
        <Button variant="contained" onClick={()=>setInputs({type: 'add_input'})}>+</Button>
        <br/>
        {Object.entries(inputs).map(([key,val])=>{
          return(
            <span key={key}>
              {val[1]}
            </span>
          );
        })}
        <br/>
        {Object.entries(inputs).map(([key,val])=>{
          return(
            JSON.stringify(key)
          );
        })}
        <br/>
        <Button
          type='submit'
        >
          Submit
        </Button>
      </form>
      {acronyms.map(acronym=>{
        return(
          <div key={acronym[Object.keys(acronym)[0]].id}>
            <p>{Object.keys(acronym)[0]}</p>
            <ul>
              {acronym[Object.keys(acronym)[0]].wordLists.map((list, i)=>{
                return(
                <li key={i}>{JSON.stringify(list)}</li>
                )
              })}
            </ul>
          </div>
        )
      })}
      {JSON.stringify(acronyms)}
    </>
  );
};

export default Landing;