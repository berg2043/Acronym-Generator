import React, { useState, useReducer } from 'react';
import { TextField, Button, makeStyles, Tooltip } from '@material-ui/core';
import Axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Results from '../Results/Results';

// Sets up material ui classes
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  inputs: {
    margin: theme.spacing(1),
    width: 200,
  },
  buttons: {
    margin: theme.spacing(1),
  },
  inputBlock: {
    display: 'inline-block',
    width: 200, 
    margin: theme.spacing(1),
  },
}));

const Landing = () => {
  // Adds material ui classes
  const classes = useStyles();

  // Navigation
  const history = useHistory();
  const params = useParams();

  // Default State
  const [inputCount, setInputCount] = useState(1);
  const [currentCount, setCurrentCount] = useState(2);

  // Sets initial inputs
  const initialInput = {
    input1: [
      <TextField
        label='word' 
        onChange={(event)=>{setInputs({type: 'edit_input', payload:{event: event.target.value, num:1}})}}
        className={classes.inputs}
        variant='filled'
        style={{backgroundColor: '#5F5B5B'}}
      />, 
      <Tooltip title="Remove Field" placement="top">
        <Button 
          variant='contained' 
          onClick={()=>setInputs({type: 'delete_input', payload: 'input1'})}
          className={classes.buttons}
          style={{backgroundColor: '#741400', color: 'white'}}
        >
          X
        </Button>
      </Tooltip>,
      ''
    ],
    input2: [
      <TextField 
        label='word' 
        onChange={(event)=>{setInputs({type: 'edit_input', payload:{event: event.target.value, num:2}})}}
        className={classes.inputs}
        variant='filled'
        style={{backgroundColor: '#5F5B5B'}}
      />,
      <Tooltip title="Remove Field" placement="top">
        <Button 
          variant='contained' 
          onClick={()=>setInputs({type: 'delete_input', payload: 'input2'})}
          className={classes.buttons}
          style={{backgroundColor: '#741400', color: 'white'}}
        >
          X
        </Button>
      </Tooltip>,
      ''
    ]
  };

  // Master input manipulation function
  function inputFunction(state, action) {
    switch (action.type) {
      case 'add_input': // adds an input
        let count = inputCount+1;
        return {...state,[`input${count}`]: [
          <TextField 
            label='word'
            onChange={(event)=>{setInputs({
              type: 'edit_input', 
              payload:{
                event: event.target.value, 
                num:count
              }
            })}}
            className={classes.inputs}
            variant='filled'
            style={{backgroundColor: '#5F5B5B'}}
          />,
          <Tooltip title="Remove Field" placement="top">
            <Button 
              variant='contained' 
              onClick={()=>{
                setInputs({type: 'delete_input', payload: `input${count}`})
              }}
              className={classes.buttons}
              style={{backgroundColor: '#741400', color: 'white'}}
            >
              X
            </Button>
          </Tooltip>,
          ''
        ]};
      case 'delete_input': // Removes and input
        delete state[action.payload]  ;
        setCurrentCount(currentCount-0.5);
        return state;
      case 'edit_input': // Edits the value of the input
        state[`input${action.payload.num}`][2] = action.payload.event;
        return state;
      default: 
        return state;
    }
  }

  // Brings all the previous input functionality together in a react reducer
  const [inputs, setInputs] = useReducer(inputFunction, initialInput);

  // Calls server to get all the acronyms from the cloud and then posts them to
  // the local PostgrSQL server in order to easily do server side pagination
  function submitForm(event){
    event.preventDefault();
    const arr = [];
    Object.entries(inputs).map(([key,val])=>{
      return arr.push(inputs[key][2])
    })
    Axios.post('/api/words/', arr).then((response)=>{
      history.push('/results/1')
    }).catch(err=>{
      console.log(err);
    })
  }

  return(
    <>
      <p style={{color: 'white', maxWidth: 800, margin: 'auto', marginTop: 8}}>
        Write words describing the process, product, etc that you would like an
        acronym for.  Press the + button to add more fields and the X button to 
        remove that field (minimum two fields).  Press submit to get your acronym.  
        If it takes longer than 30 seconds to get an acronym, the server has crashed.
      </p>
      { 
        currentCount<7?
          <Tooltip title="Add" placement="top">
            <Button 
              variant="contained" 
              onClick={()=>{
                setInputCount(inputCount+1);
                setCurrentCount(currentCount+1);
                setInputs({type: 'add_input'})
              }}
              className={classes.buttons}
              color='secondary'
            >
              +
            </Button>
          </Tooltip>:
          null
      }
      <br/>
      <form onSubmit={(event)=>submitForm(event)}>
        {Object.entries(inputs).map(([key,val])=>{
          return(
            <span className={classes.inputBlock} key={key}>
              {val[0]}
              {currentCount>2?val[1]:null}
            </span>
          );
        })}
        <br/>
        <Button
          variant="contained" 
          type='submit'
          className={classes.buttons}
          style={{backgroundColor: '#115671', color: 'white'}}
        >
          Submit
        </Button>
      </form>
      {Object.keys(params).length > 0? <Results/> : null}
    </>
  );
};

export default Landing;