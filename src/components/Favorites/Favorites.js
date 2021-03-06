import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, List, ListSubheader } from '@material-ui/core';
import FavoriteAcronym from './../FavoriteAcronym/FavoriteAcronym';

// Sets up material ui classes
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Favorites = () => {
  // Adds material ui classes
  const classes = useStyles();

  // Connects to redux
  const dispatch = useDispatch();
  const user = useSelector(state=>state.username);
  const favorites = useSelector(state=>state.favorites)

  // Gets list of favorites on load
  useEffect(()=>{
    dispatch({type: 'GET_FAVORITES'});
  }, [dispatch])

  return(
    <>
      <h1 style={{color:'white'}}>Welcome {user.username}</h1>
      <List
        component='nav'
        subheader={
          <ListSubheader component='div' style={{backgroundColor: 'black'}}>
            Favorite Acronyms
          </ListSubheader>
        }
        className={classes.root}
      >
        {favorites.map(favorite=>{
          return(
            <FavoriteAcronym key={favorite.word_list} favorite={favorite} />
          )
        })}
      </List>
    </>
  );
};

export default Favorites;