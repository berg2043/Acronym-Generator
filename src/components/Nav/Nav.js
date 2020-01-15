import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Nav = () =>{
  const username = useSelector(state=>state.username.username);
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
        Favorites
      </a>
    </nav>
  );
};

export default Nav;