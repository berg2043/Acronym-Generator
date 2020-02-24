import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Results = (props) => {
  const params = useParams();
  const dispatch = useCallback(useDispatch());
  useEffect(()=>{
    dispatch({type: 'GET_ACRONYMS'});
  },[params.page, dispatch])
  return(
    <div>
      {JSON.stringify(params.page)}
      <br/>
    </div>
  )
}

export default Results;