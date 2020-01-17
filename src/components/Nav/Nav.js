import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Nav = () =>{
  const user = useSelector(state=>state.username);
  const dispatch = useDispatch();
  
  const history = useHistory();
  return(
    <nav>
      <h1>Acronym Generator</h1>
      <a
      href='/'
      onClick={
        event=>{
          event.preventDefault();
          history.push('/');
        }
      }
      >
        Home
      </a>
      <a
      href='/favorites'
      onClick={
        event=>{
          event.preventDefault();
          history.push('/favorites');
        }
      }
      >
        {user.id? 'Favorites':'Login'}
      </a>
      {user.id? <button onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</button>: null}
    </nav>
  );
};

export default Nav;