import React, { useState, useEffect } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

const Register = () => {
  // Adds material ui classes
  const classes = useStyles();

  // Connects to redux
  const dispatch = useDispatch();
  const user = useSelector(state=>state.username);

  // Default State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Adds history for programmatic routing
  const history = useHistory();

  // Pushes user to the landing page after they get logged in from registering
  useEffect(()=>{
    if(user.id){
      history.push('/')
    }
  }, [user, history])

  // Registers the user and logs them in
  function registerUser(event){
    event.preventDefault();
    dispatch({type: 'REGISTER', payload: {username, password}});
  }

  return(
    <>
      <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <TextField
            label='Username'
            value={username}
            required
            onChange={event=>setUsername(event.target.value)}
            variant='filled'
            className={classes.inputs}
          />
          <br/>
          <PasswordInput
            required
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
            Reigster
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;