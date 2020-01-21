import React, { useState, useEffect } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
  const classes = useStyles();

  const dispatch = useDispatch();

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state=>state.username);

  function registerUser(event){
    event.preventDefault();
    dispatch({type: 'REGISTER', payload: {username, password}});
  }
  const history = useHistory();
  useEffect(()=>{
    console.log(user.id)
    if(user.id){
      history.push('/')
    }
  }, [user, history])

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