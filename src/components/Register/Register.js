import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Register = () => {
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
  }, [user])

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
          />
          <br/>
          <PasswordInput
            required
            label='Password'
            value={password}
            onChange={event=>setPassword(event.target.value)}
          />
          <br/>
          <Button
            type='submit'
          >
            Reigster
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;