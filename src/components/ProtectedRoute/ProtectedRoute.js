import React from 'react';
import { useSelector } from 'react-redux';
import LogIn from '../LogIn/LogIn';
import { Route } from 'react-router-dom';

export default  (props) => {
  const {
    component,
    ...otherprops
  } = props;
  
  const user = useSelector(state=>state.username);

  let shown;

  if(user.id){
    shown = component;
  } else {
    shown = LogIn;
  }

  return(
    <Route {...otherprops} component={shown} />
  );
};