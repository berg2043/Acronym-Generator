import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import PasswordInput from '../PasswordInput/PasswordInput';

const Register = () => {
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return(
    <>
      <div>
        <h1>Register</h1>
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
            Reigster
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;