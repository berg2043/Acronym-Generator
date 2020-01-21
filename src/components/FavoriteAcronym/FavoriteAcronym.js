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
    backgroundColor: 'lightgray'
  },
  buttons: {
    margin: theme.spacing(1),
  },
  inputs: {
    margin: theme.spacing(1),
    minWidth: 200,
    backgroundColor: '#5F5B5B',
  },
  inputBlock: {
    display: 'inline-block',
    width: 200, 
    margin: theme.spacing(1),
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
          <ListItemText style={{color: 'white'}} primary={acronym} />
        }
      </ListItem>
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            {
              edit?
                <span className={classes.inputBlock}>
                  {props.favorite.word_list.map((word, i) =>{
                    return(
                      <TextField 
                        key={i}
                        value={words[i]}
                        onChange={(event)=>setWords({...words, [i]: event.target.value})}
                        className={classes.inputs}
                        variant='filled'
                      />
                    )
                  })}
                </span>:
                <ListItemText primary={Object.values(words).join(', ')} />
            }
            <span style={{minWidth: 193, float: 'right',  display: 'inline-block'}}>
              {
                edit?
                  <Button 
                    className={classes.buttons} 
                    style={{backgroundColor: '#388e3c', color: 'white'}} 
                    color='Success' onClick={()=>saveChange()}
                  >
                    Save
                  </Button>:
                  <Button 
                    className={classes.buttons} 
                    variant='contained' color='primary' 
                    onClick={()=>setEdit(!edit)}
                  >
                    Edit
                  </Button>
              }
              {edit? <br/> : null}
              <Button 
                className={classes.buttons} 
                variant='contained' 
                style={{backgroundColor: '#741400', color: 'white'}} 
                onClick={removeFavorite}
              >
                Remove
              </Button>
            </span>
          </ListItem>
        </List>
    </>
  )
}

export default FavoriteAcronym;