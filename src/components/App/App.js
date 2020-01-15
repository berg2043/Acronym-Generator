import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';
import Favorites from '../Favorites/Favorites';
import Admin from '../Admin/Admin';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={LogIn} />
          <Route exact path='/favorites' component={Favorites} />
          <Route exact path='admin' component={Admin}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
