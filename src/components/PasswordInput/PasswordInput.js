import { InputAdornment, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { RemoveRedEye } from '@material-ui/icons';
import React, { useState } from 'react';

// Changes cursor to pointer
const useStyles = makeStyles( theme => ({
  eye: {
    cursor: 'pointer',
  },
}));

const PasswordInput = (props) => {
  // Adds styling
  const classes = useStyles();
  
  // States 
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  // Toggles the mask
  function toggleMask(){
    setPasswordIsMasked(!passwordIsMasked)
  } 
  
  return (
    <TextField 
        type={passwordIsMasked ? 'password' : 'text'}
        {...props} 
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <RemoveRedEye
                className={classes.eye}
                onClick={toggleMask}
              />
            </InputAdornment>
          ),
        }}
      />
  )
}

export default PasswordInput;