import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';
import Favorites from '../Favorites/Favorites';
import Admin from '../Admin/Admin';
import './App.css';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Nav from '../Nav/Nav';

function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch({type: 'FETCH_USER'});
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Route path='/' component={Nav}/>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <ProtectedRoute exact path='/favorites' component={Favorites}/>
          <Route exact path='/login' component={LogIn} />
          {/* <Route exact path='/favorites' component={Favorites} /> */}
          <Route exact path='admin' component={Admin}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
