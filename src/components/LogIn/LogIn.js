import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Sets up material ui classes
const useStyles = makeStyles(theme => ({
  inputs: {
    backgroundColor: '#5F5B5B',
    margin: theme.spacing(1),
    width: 200,
  },
  buttons: {
    margin: theme.spacing(1),
  },
}))

const LogIn = () => {
  // Adds material ui classes
  const classes = useStyles();
  
  // Connects to redux
  const dispatch = useDispatch();

  // Default State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Adds histroy for progromatic routing
  const history = useHistory();
  
  // Logs user in
  function login(event){
    event.preventDefault();
    dispatch({type: 'LOGIN', payload:{username, password}});
  }

  return(
    <>
      <div>
        <h1>Log In</h1>
        <form onSubmit={login}>
          <TextField
            label='Username'
            value={username}
            onChange={event=>setUsername(event.target.value)}
            variant='filled'
            className={classes.inputs}
          />
          <br/>
          <PasswordInput
            label='Password'
            value={password}
            onChange={event=>setPassword(event.target.value)}
            variant='filled'
            className={classes.inputs}
          />
          <br/>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.buttons}
          >
            Log In
          </Button>
        </form>
        <h4 style={{color: 'white'}}>Not Registered Yet?</h4>
        <p>
          <a href="/register" onClick={event=>{event.preventDefault(); history.push('/register');}}>
            <strong>Register Here</strong>
          </a>
        </p>
      </div>
    </>
  );
};

export default LogIn;