import React, { useState, useEffect } from 'react';
import { makeStyles, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons/';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const WordList = (props) => {
  const classes = useStyles();
  const [favorited, setFavorited] = useState(false);

  function favoriteList() {
    props.favoriteSingle(props.list, favorited);
    setFavorited(!favorited);
  }
  
  useEffect(()=>{
    setFavorited(props.all);
  },[props.all])

  return (
    <ListItem className={classes.nested}>
      <ListItemText primary={props.list.join(', ')} />
      {
        favorited?
          <IconButton onClick={favoriteList}><Favorite /></IconButton> :
          <IconButton onClick={favoriteList}><FavoriteBorder /></IconButton>
      }
    </ListItem>
  )
}

export default WordList;