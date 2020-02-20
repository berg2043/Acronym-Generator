import React, { useState, useEffect } from 'react';
import { makeStyles, ListItem, ListItemText, IconButton, Tooltip } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons/';

// Sets up material ui classes
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
  // Adds material ui classes
  const classes = useStyles();

  // Default state
  const [favorited, setFavorited] = useState(false);
  
  // Favortites this word list if the parrent acronym is favorited
  useEffect(()=>{
    setFavorited(props.all);
  },[props.all])

  // Toggles favorites
  function favoriteList() {
    props.favoriteSingle(props.list, favorited);
    setFavorited(!favorited);
  }

  return (
    <ListItem className={classes.nested}>
      <ListItemText primary={props.list.join(', ')} />
      <IconButton onClick={favoriteList}>
        {
          favorited? 
          <Tooltip title="Remove from Favorites" placement="top">
            <Favorite style={{fill: '#C70767'}}/> 
          </Tooltip> :
          <Tooltip title="Add to Favorites" placement="top">
            <FavoriteBorder style={{fill: '#C70767'}}/>
          </Tooltip>
        }
      </IconButton>
    </ListItem>
  )
}

export default WordList;