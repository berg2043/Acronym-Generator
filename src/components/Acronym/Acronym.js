import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, IconButton, Tooltip } from '@material-ui/core';
import { ExpandLess, ExpandMore, Favorite, FavoriteBorder, FlagOutlined, Flag } from '@material-ui/icons/';
import WordList from '../WordList/WordList';
import { useDispatch, useSelector } from 'react-redux';

const Acronym = (props) => {
  // Connects to redux
  const dispatch = useDispatch();
  const user = useSelector(state=>state.username);

  // Default State
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const [count, setCount] = useState(0);
  const [flagged, setFlagged] = useState(false);
  
  // Handles the opening and closing of the word lists under the acronym
  function handleClick() {
    setOpen(!open);
  }

  // Toggles the flagging of words for admin review
  function handleFlag() {
    if(!flagged){
      dispatch({type: 'FLAG_WORD', payload: props.acronym})
    }
    setFlagged(!flagged);
  }

  // Favorites all the word lists under the acronym
  function favoriteAll() {
    if(user.id){
      if(all || count === props.acronym.wordLists.length){
        dispatch({type: 'REMOVE_FAVORITE', payload: props.acronym});
        setCount(0)
        all===false? setAll(null) : setAll(false);
      } else {
        dispatch({type: 'ADD_FAVORITE', payload: props.acronym});
        setCount(props.acronym.wordLists.length)
        setAll(true);
      }
    } else {
      alert('you need to login')
    }
  }

  // Favorites a single word combination. Listed here to increase the count
  function favoriteSingle(favoriteList, favoriteStatus){
    if(user.id){
      const acronymAndList = {
        acronym: props.acronym.acronym,
        word_id: props.acronym.word_id,
        wordLists: [favoriteList]
      }
      if(favoriteStatus){
        dispatch({type: 'REMOVE_FAVORITE', payload: acronymAndList})
        setCount(count-1);
      } else {
        dispatch({type: 'ADD_FAVORITE', payload: acronymAndList});
        setCount(count+1);
      }
    } else {
      alert('you need to login')
    }
  }

  return (
    <>
      <ListItem>
        <ListItemText style={{color: 'white'}} primary={props.acronym.acronym} />
        <IconButton onClick={handleFlag}>
          {
            flagged? 
              <Tooltip title="Flag will be reviewed by admin" placement="top">
                <Flag style={{fill: 'red'}}/>
              </Tooltip> :
              <Tooltip title="Flag for removal" placement="top">
                <FlagOutlined style={{fill: 'red'}}/>
              </Tooltip>
          }
        </IconButton>
        <IconButton onClick={favoriteAll}>
          {
            all || count === props.acronym.wordLists.length ?
            <Tooltip title="Remove all from Favorites" placement="top">
              <Favorite style={{fill: '#C70767'}}/> 
            </Tooltip> :
            <Tooltip title="Add all to Favorites" placement="top">
              <FavoriteBorder style={{fill: '#C70767'}}/>
            </Tooltip>
          }
        </IconButton>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.acronym.wordLists.map((list, i) => {
            return (
              <WordList
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