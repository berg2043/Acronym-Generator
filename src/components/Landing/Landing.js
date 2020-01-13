import React, { useState, useReducer } from 'react';
import { TextField, Button } from '@material-ui/core'

const Landing = () => {
  const [inputCount, setInputCount] = useState(2)
  const [currentCount, setCurrentCount] = useState(2)

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
  }

  function inputFunction(state, action) {
    switch (action.type) {
      case 'add_input':
        let count = inputCount+1;
        console.log(count)
        setInputCount(inputCount+1);
        setCurrentCount(currentCount+1);
        console.log('wuh')
        return {...state,[`input${count}`]: [
          <TextField label={count} onChange={(event)=>{setInputs({type: 'edit_input', payload:{event: event.target.value, num:count}})}}/>,
          <Button variant='contained' onClick={()=>setInputs({type: 'delete_input', payload: `input${count}`})}>X</Button>,
          ''
        ]};
      case 'delete_input':
        delete state[action.payload]  
        setCurrentCount(currentCount-1)
        return state;
      case 'edit_input':
        state[`input${action.payload.num}`][2] = action.payload.event;
        return state 
      default:
        return state;
    }
  }

  const [inputs, setInputs] = useReducer(inputFunction, initialInput);
  }

  // Logs the entries after entered.
  function submitForm(event){
    event.preventDefault();
    const arr = []
    Object.entries(inputs).map(([key,val])=>{
      return arr.push(inputs[key][2])
    })
    console.log(arr);
  }

  return(
    <>
      <form onSubmit={(event)=>submitForm(event)}>
        {Object.entries(inputs).map(([key,val])=>{
          return(
            <span key={key}>
              {val[0]}
            </span>
          )
        })}
        <Button variant="contained" onClick={()=>setInputs({type: 'add_input'})}>+</Button>
        <br/>
        {Object.entries(inputs).map(([key,val])=>{
          return(
            <span key={key}>
              {val[1]}
            </span>
          )
        })}
        <br/>
        {Object.entries(inputs).map(([key,val])=>{
          return(
            JSON.stringify(key)
          )
        })}
        <br/>
        <Button
          type='submit'
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Landing;