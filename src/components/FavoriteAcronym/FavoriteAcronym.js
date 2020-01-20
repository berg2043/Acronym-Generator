import React, { useState, useEffect } from 'react';
import { makeStyles, List, ListItem, ListItemText, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const FavoriteAcronym = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [words, setWords] = useState([])
  const [acronym, setAcronym] = useState(props.favorite.word)

  useEffect(()=>{
    const holder={}
    props.favorite.word_list.map((word, i)=>{
      holder[i] = word
      return null;
    })
    setWords(holder)
  }, [props.favorite.word_list])

  function saveChange(){
    setEdit(!edit)
    dispatch({type: 'UPDATE_FAVORITE', payload: {acronym, words, wordList: props.favorite.word_list}})
  }

  function removeFavorite(){
    const objectToSend = {
      [acronym]:{
        wordLists: [Object.values(words)]
      }
    }
    dispatch({type: 'REMOVE_FAVORITE', payload: objectToSend});
  }

  return (
    <>
      <ListItem>
        {
          edit?
          <TextField value={acronym} onChange={(event)=>setAcronym(event.target.value)}/>:
          <ListItemText primary={acronym} />
        }
      </ListItem>
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            {
              edit?
                props.favorite.word_list.map((word, i) =>{
                  return(
                    <TextField 
                      key={i}
                      value={words[i]}
                      onChange={(event)=>setWords({...words, [i]: event.target.value})}
                    />
                  )
                }):
                <ListItemText primary={Object.values(words).join(', ')} />
            }
            {
              edit?
                <Button onClick={()=>saveChange()}>Save</Button>:
                <Button onClick={()=>setEdit(!edit)}>Edit</Button>
            }
            <Button onClick={removeFavorite}>Remove</Button>
          </ListItem>
        </List>
    </>
  )
}

export default FavoriteAcronym;