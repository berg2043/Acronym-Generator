import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, List, ListSubheader } from '@material-ui/core';
import Acronym from '../Acronym/Acronym';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto'
  },
}));

const Results = (props) => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useCallback(useDispatch());
  const acronyms = useSelector(state => state.acronyms);
  const count = useSelector(state => state.count);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    dispatch({ type: 'GET_ACRONYMS', payload: params.page -1 });
  }, [params.page, dispatch]);

  useEffect(()=>{
    const pageArr=[];
    for(let i = 0; i< count/10; i++){
      pageArr.push(i+1);
    };
    setPages(pageArr);
  },[count]);

  return (
    <div>
      <List
        component='nav'
        subheader={
          <ListSubheader component='div' style={{ backgroundColor: 'black' }}>
            Acronyms
          </ListSubheader>
        }
        className={classes.root}
      >
        {acronyms.map(acronym => {
          return (
            <Acronym acronym={acronym} key={acronym.word_id} />
          )
        })}
      </List>
      <span>{pages.length > 0 ? pages.map(i=><span><Link to={`/results/${i}`} key={i}>{i}</Link>&nbsp;</span>): null}</span>
    </div>
  )
}

export default Results;