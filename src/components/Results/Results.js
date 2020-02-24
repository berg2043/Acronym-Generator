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

const Results = () => {
  // Adds material ui classes
  const classes = useStyles();

  // Navigation
  const params = useParams();

  // Connects to redux
  const dispatch = useCallback(useDispatch());
  const acronyms = useSelector(state => state.acronyms);
  const count = useSelector(state => state.count);

  // Default state
  const [pages, setPages] = useState([]);
  useEffect(() => {
    dispatch({ type: 'GET_ACRONYMS', payload: +params.page - 1 });
  }, [params.page, dispatch]);

  // Creates an arrow of numbers 1 to the number of pages to create the navigation
  // at bottom of the page
  useEffect(() => {
    const pageArr = [];
    for (let i = 0; i < count / 10; i++) {
      pageArr.push(i + 1);
    };
    setPages(pageArr);
  }, [count]);

  return (
    <div>
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
      </div>
      <div style={{ paddingTop: 10, paddingBottom: 20 }}>
        <span>
          {+params.page === 1 ? null : <Link to={`${+params.page - 1}`}>&lt;&lt;</Link>}
          &nbsp;
          {pages.length > 0 ? pages.map(i => <span><Link to={`/results/${i}`} key={i}>{i}</Link>&nbsp;</span>) : null}
          &nbsp;
          {+params.page === Math.ceil(count / 10) ? null : <Link to={`${+params.page + 1}`}>&gt;&gt;</Link>}
        </span>
      </div>
    </div>
  )
}

export default Results;