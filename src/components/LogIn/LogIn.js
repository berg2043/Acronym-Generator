import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useHistory } from 'react-router-dom';

const LogIn = () => {
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Adds histroy for progromatic routing
  const history = useHistory();
  
  return(
    <>
      <div>
        <h1>Log In</h1>
        <form onSubmit={event=>event.preventDefault()}>
          <TextField
            label='Username'
            value={username}
            onChange={event=>setUsername(event.target.value)}
          />
          <br/>
          <PasswordInput
            label='Password'
            value={password}
            onChange={event=>setPassword(event.target.value)}
          />
          <br/>
          <Button
            type='submit'
          >
            Log In
          </Button>
        </form>
        <p>Not Registered Yet?</p>
        <p><a href="/register" onClick={event=>{event.preventDefault(); history.push('/register')}}>Register Here</a></p>
      </div>
    </>
  );
};

export default LogIn;