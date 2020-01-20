import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore, Favorite, FavoriteBorder, FlagOutlined, Flag } from '@material-ui/icons/';
import WordList from '../WordList/WordlList';
import { useDispatch, useSelector } from 'react-redux';

const Acronym = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const [count, setCount] = useState(0);
  const [flagged, setFlagged] = useState(false);
  const user = useSelector(state=>state.username);
  
  function handleClick() {
    setOpen(!open);
  }

  function handleFlag() {
    if(!flagged){
      dispatch({type: 'FLAG_WORD', payload: props.acronym})
    }
    setFlagged(!flagged);
  }

  function favoriteAll() {
    if(user.id){
      if(all){
        dispatch({type: 'REMOVE_FAVORITE', payload: props.acronym});
        setCount(0)
        setAll(false)
      } else {
        dispatch({type: 'ADD_FAVORITE', payload: props.acronym});
        setAll(!all);
      }
    } else {
      alert('you need to login')
    }
  }

  function favoriteSingle(favoriteList, favoriteStatus){
    if(user.id){
      const acronymAndList = {
        [Object.keys(props.acronym)[0]]: {
          id: props.acronym[Object.keys(props.acronym)[0]].id,
          wordLists: [favoriteList]
        }
      }
      if(favoriteStatus){
        dispatch({type: 'REMOVE_FAVORITE', payload: acronymAndList})
        setCount(count-1);
      } else {
        dispatch({type: 'ADD_FAVORITE', payload: acronymAndList});
        if(count+1 === props.acronym[Object.keys(props.acronym)[0]].wordLists.length){
          setAll(true);
        }
        setCount(count+1);
      }
    } else {
      alert('you need to login')
    }
  }

  return (
    <>
      <ListItem>
        <ListItemText primary={Object.keys(props.acronym)[0]} />
        <IconButton onClick={handleFlag}>
          {flagged? <Flag/> : <FlagOutlined/>}
        </IconButton>
        <IconButton onClick={favoriteAll}>
          {all ? <Favorite /> :<FavoriteBorder />}
        </IconButton>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.acronym[Object.keys(props.acronym)[0]].wordLists.map((list, i) => {
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