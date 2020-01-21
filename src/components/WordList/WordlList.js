import React, { useState, useEffect } from 'react';
import { makeStyles, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons/';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: 'lightgray'
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
      <IconButton onClick={favoriteList}>
        {favorited? <Favorite style={{fill: '#C70767'}}/> : <FavoriteBorder style={{fill: '#C70767'}}/>}
      </IconButton>
    </ListItem>
  )
}

export default WordList;