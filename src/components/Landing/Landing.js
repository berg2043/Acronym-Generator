import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core'

const Landing = () => {
  // Default input state
  const [inputs, setInputs] = useState({
    input1: [
      <TextField label={1} onChange={(event)=>{changeInput(event,1)}}/>, 
      <Button variant='contained' onClick={()=>deleteInput('input1')}>X</Button>,
      ''
    ],
    input2: [
      <TextField label={2} onChange={(event)=>{changeInput(event,2)}}/>, 
      <Button variant='contained' onClick={()=>deleteInput('input2')}>X</Button>,
      ''
    ]
  }) 

  // Counts to increase the name and attempt to prevent less than 2
  const [inputCount, setInputCount] = useState(2)
  const [currentCount, setCurrentCount] = useState(2)

  // Removes an input
  function deleteInput(key){
    delete inputs[key]  
    setInputs(inputs);
    setCurrentCount(currentCount-1)
  }

  // Adds an input
  function addInput(){
    let count = inputCount+1;
    setInputCount(inputCount+1);
    inputs[`input${count}`] = [
      <TextField label={count} onChange={(event)=>{changeInput(event,count)}}/>,
      <Button variant='contained' onClick={()=>deleteInput(`input${count}`)}>X</Button>,
      ''
    ]
    setInputs(inputs);
    setCurrentCount(currentCount+1);
  }

  // Stores the text as individuals type
  function changeInput(event, num){
    inputs[`input${num}`][2] = event.target.value;
    setInputs(inputs)
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
        <Button variant="contained" onClick={addInput}>+</Button>
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