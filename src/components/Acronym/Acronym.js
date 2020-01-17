import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore, Favorite, FavoriteBorder } from '@material-ui/icons/';
import WordList from '../WordList/WordlList';
import { useDispatch } from 'react-redux';

const Acronym = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const [count, setCount] = useState(0);

  function handleClick() {
    setOpen(!open);
  }

  function favoriteAll() {
    if(all){
      dispatch({type: 'REMOVE_FAVORITE', payload: props.acronym});
    } else {
      dispatch({type: 'ADD_FAVORITE', payload: props.acronym});
    }
    setAll(!all);
  }

  function favoriteSingle(favoriteList, favoriteStatus){
    const acronymAndList = {
      [Object.keys(props.acronym)[0]]: {
        id: props.acronym[Object.keys(props.acronym)[0]].id,
        wordLists: [favoriteList]
      }
    }
    if(favoriteStatus){
      dispatch({type: 'REMOVE_FAVORITE', payload: acronymAndList})
    } else {
      dispatch({type: 'ADD_FAVORITE', payload: acronymAndList});
    }
  }

  function counting(increment){
    setCount(count + increment);
  }

  return (
    <>
      <ListItem>
        <ListItemText primary={Object.keys(props.acronym)[0]} />
        {
          all || count===props.acronym[Object.keys(props.acronym)[0]].length ?
            <IconButton onClick={favoriteAll}><Favorite /></IconButton> :
            <IconButton onClick={favoriteAll}><FavoriteBorder /></IconButton>
        }
        {
          open ?
            <IconButton onClick={handleClick}><ExpandLess /></IconButton> :
            <IconButton onClick={handleClick}><ExpandMore /></IconButton>
        }
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.acronym[Object.keys(props.acronym)[0]].wordLists.map((list, i) => {
            return (
              <WordList
                counting={counting}
                favoriteSingle={favoriteSingle} 
                all={all} 
                list={list} 
                key={i} 
              />
            )
          })}
        </List>
      </Collapse>
    </>
  )
}

export default Acronym;