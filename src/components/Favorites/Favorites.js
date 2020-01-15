import React from 'react';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const user = useSelector(state=>state.username);
  
  return(
    <>
      <h1>Welcome {user.username}</h1>
    </>
  );
};

export default Favorites;