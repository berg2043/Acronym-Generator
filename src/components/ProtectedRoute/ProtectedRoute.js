import React from 'react';
import { useSelector } from 'react-redux';
import LogIn from '../LogIn/LogIn';
import { Route } from 'react-router-dom';

export default  (props) => {
  // Makes props more easily accessible
  const {
    component,
    ...otherprops
  } = props;
  
  // Connects to redux
  const user = useSelector(state=>state.username);

  // Defines variable to be used below
  let shown;

  // Changes component to show to login if user isn't logged in
  if(user.id){
    shown = component;
  } else {
    shown = LogIn;
  }

  return(
    <Route {...otherprops} component={shown} />
  );
};