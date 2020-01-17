import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, List, ListSubheader } from '@material-ui/core';
import FavoriteAcronym from './../FavoriteAcronym/FavoriteAcronym';

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
  
  const classes = useStyles();
  const user = useSelector(state=>state.username);
  const dispatch = useDispatch();
  const favorites = useSelector(state=>state.favorites)

  useEffect(()=>{
    dispatch({type: 'GET_FAVORITES'});
  }, [dispatch])

  return(
    <>
      <h1>Welcome {user.username}</h1>
      <List
        component='nav'
        subheader={
          <ListSubheader component='div'>
            Words in Order
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